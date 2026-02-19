const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendEmail = async ({ to, subject, html }) => {
  try {
    if (!process.env.BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY is missing in .env");
    }

    const client = SibApiV3Sdk.ApiClient.instance;

    client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

    const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const response = await emailApi.sendTransacEmail({
      sender: {
        name: "Hostel Management System",
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    });

    console.log("✅ Email sent successfully");
    return response;
  } catch (error) {
    console.error(
      "❌ Brevo Email Error:",
      error.response?.body || error.message,
    );
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmail;
