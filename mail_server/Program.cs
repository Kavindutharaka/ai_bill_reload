using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();
app.UseCors();

// Health check
app.MapGet("/", () => Results.Ok(new { status = "Mail server running", timestamp = DateTime.UtcNow }));

// Send mail endpoint
app.MapPost("/api/send-mail", async (MailRequest request, IConfiguration config) =>
{
    try
    {
        var smtp = config.GetSection("SmtpSettings");
        var server = smtp["Server"]!;
        var port = int.Parse(smtp["Port"]!);
        var username = smtp["Username"]!;
        var password = smtp["Password"]!;
        var fromEmail = smtp["FromEmail"]!;
        var fromName = smtp["FromName"] ?? "Avurudu Reload Wasi";

        // Validate request
        if (string.IsNullOrWhiteSpace(request.To))
            return Results.BadRequest(new { success = false, message = "Recipient email (to) is required." });

        if (string.IsNullOrWhiteSpace(request.Subject))
            return Results.BadRequest(new { success = false, message = "Subject is required." });

        if (string.IsNullOrWhiteSpace(request.Body))
            return Results.BadRequest(new { success = false, message = "Body is required." });

        // Build message
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(fromName, fromEmail));

        // Support multiple recipients (comma-separated)
        var recipients = request.To.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        foreach (var recipient in recipients)
        {
            message.To.Add(MailboxAddress.Parse(recipient));
        }

        // CC support
        if (!string.IsNullOrWhiteSpace(request.Cc))
        {
            var ccList = request.Cc.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
            foreach (var cc in ccList)
            {
                message.Cc.Add(MailboxAddress.Parse(cc));
            }
        }

        message.Subject = request.Subject;

        var bodyBuilder = new BodyBuilder();
        if (request.IsHtml)
            bodyBuilder.HtmlBody = request.Body;
        else
            bodyBuilder.TextBody = request.Body;

        message.Body = bodyBuilder.ToMessageBody();

        // Send via SMTP
        using var client = new SmtpClient();
        await client.ConnectAsync(server, port, SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(username, password);
        var response = await client.SendAsync(message);
        await client.DisconnectAsync(true);

        return Results.Ok(new { success = true, message = "Email sent successfully.", smtpResponse = response });
    }
    catch (Exception ex)
    {
        return Results.Json(new { success = false, message = "Failed to send email.", error = ex.Message }, statusCode: 500);
    }
});

// Bulk send endpoint (for sending to multiple people with different content)
app.MapPost("/api/send-bulk", async (BulkMailRequest request, IConfiguration config) =>
{
    try
    {
        var smtp = config.GetSection("SmtpSettings");
        var server = smtp["Server"]!;
        var port = int.Parse(smtp["Port"]!);
        var username = smtp["Username"]!;
        var password = smtp["Password"]!;
        var fromEmail = smtp["FromEmail"]!;
        var fromName = smtp["FromName"] ?? "Avurudu Reload Wasi";

        if (request.Emails == null || request.Emails.Count == 0)
            return Results.BadRequest(new { success = false, message = "No emails provided." });

        using var client = new SmtpClient();
        await client.ConnectAsync(server, port, SecureSocketOptions.StartTls);
        await client.AuthenticateAsync(username, password);

        var results = new List<object>();
        foreach (var email in request.Emails)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress(fromName, fromEmail));
                message.To.Add(MailboxAddress.Parse(email.To));
                message.Subject = email.Subject;

                var bodyBuilder = new BodyBuilder();
                if (email.IsHtml)
                    bodyBuilder.HtmlBody = email.Body;
                else
                    bodyBuilder.TextBody = email.Body;

                message.Body = bodyBuilder.ToMessageBody();
                await client.SendAsync(message);
                results.Add(new { to = email.To, success = true });
            }
            catch (Exception ex)
            {
                results.Add(new { to = email.To, success = false, error = ex.Message });
            }
        }

        await client.DisconnectAsync(true);
        return Results.Ok(new { success = true, message = $"Processed {results.Count} emails.", results });
    }
    catch (Exception ex)
    {
        return Results.Json(new { success = false, message = "Failed to connect to SMTP.", error = ex.Message }, statusCode: 500);
    }
});

app.Run();

// Request models
public record MailRequest(string To, string Subject, string Body, bool IsHtml = true, string? Cc = null);
public record BulkMailRequest(List<MailRequest> Emails);
