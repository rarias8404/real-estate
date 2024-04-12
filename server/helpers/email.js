const style = `
  background: #eee;
  padding: 20px;
  border-radius: 20px;
`;

export const emailTemplate = (email, content, subject) => {
  return {
    Source: `"Real Estate" <${process.env.EMAIL_FROM}>`,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
          <html>
            <div style="${style}">
              <h1>Welcome to Real Estate App!</h1>
              ${content}
              <p style="font-weight: bold">Real Estate Company &copy; ${new Date().getFullYear()}</p>
            </div>
          </html>
          `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
  };
};
