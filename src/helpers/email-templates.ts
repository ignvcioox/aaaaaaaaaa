interface EmailHtmlProps {
  title: string;
  message: string;
  buttonText: string;
  buttonUrl?: string;
  footer: string;
}

export function createEmailHtml({
  title,
  message,
  buttonText,
  buttonUrl,
  footer,
}: EmailHtmlProps) {
  return `
    <div style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 40px;">
      <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 32px;">
        <h2 style="color: #2d89ef; text-align: center;">${title}</h2>
        <p style="font-size: 16px; color: #333; text-align: center;">
          ${message}
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${buttonUrl}"
             style="background: #2d89ef; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; display: inline-block;">
            ${buttonText}
          </a>
        </div>
        <p style="font-size: 14px; color: #888; text-align: center;">
          ${footer}
        </p>
      </div>
    </div>
  `;
}
export function createVerificationCodeEmail({
  title,
  message,
  buttonText,
  footer,
}: {
  title: string;
  message: string;
  buttonText: string;
  footer: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 0;">
      <div style="max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
        <div style="background: #6c3ee6; padding: 32px 24px;">
          <img src="https://cdn-icons-png.flaticon.com/512/616/616494.png" alt="Panther Logo" style="height: 32px; margin-bottom: 16px;">
          <h1 style="color: #fff; font-size: 32px; margin: 0;">${title}</h1>
        </div>
        <div style="padding: 32px 24px;">
          <p style="font-size: 16px; color: #333; margin-bottom: 32px;">
            ${message}
          </p>
          <div style="text-align: left; margin-bottom: 32px;">
            <button"
               style="background: #6c3ee6; color: #fff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; display: inline-block;">
              ${buttonText}
            </button>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
          <p style="font-size: 13px; color: #888; margin-bottom: 8px;">
            ${footer}
          </p>
          <p style="font-size: 12px; color: #aaa;">
            CL, Chile | +56 9 2367 4449 | support@cleanpro.com
          </p>
          <div style="margin-top: 16px;">
            <a href="#" style="margin-right: 8px;"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Twitter" style="height: 20px;"></a>
            <a href="#" style="margin-right: 8px;"><img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" alt="Instagram" style="height: 20px;"></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" style="height: 20px;"></a>
          </div>
        </div>
      </div>
    </div>
  `;
}