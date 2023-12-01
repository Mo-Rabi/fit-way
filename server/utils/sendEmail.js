import { createTransport } from "nodemailer";

export const sendToEmail = async (email, token, userType, firstName) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: "mostafa.rapi3@gmail.com",
      pass: "vylvyjahuqvxgxbx",
    },
  });

  const link = `http://localhost:4000/${userType}/verify/${token}`;

  const info = await transporter.sendMail({
    from: '"Mo Rabi" <mostafa.rapi3@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Welcome to FitWay!👋", // Subject line
    text: "Hello world", // plain text body
    html: `<div style="padding: 8px; border-radius: 8px; background-color: white; margin: 12px auto; font-family: sans-serif;">
    <img
      src="https://i.ibb.co/x5Yr6sm/logo.png"
      alt="logo"
      style="display: block; margin: 1% auto; width: 20%;"
    />
    <div style="margin:1% 5% 7% 5%; padding:4%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <h1 style="font-size: 1.5rem; padding-top: 1%;">Welcome to FitWay!👋</h1>
      <p>
        Hey ${firstName}, Welcome to FitWay! We're super excited to have you on board.
        To get you started on your personal training journey, we just need you to verify your email address.
        It's a piece of cake - just hit the button below.
      </p>
      <a
        style="display: inline-block; background-color: #007BFF; color: white; font-weight: bold; padding: 8px 16px; border-radius: 4px; text-decoration: none; cursor: pointer; "
        href="${link}"
      >
        Click to verify
      </a>
      <p style="color: #888; margin-top: 28px;">
       If you didn't sign up for an account with us, you can safely ignore this email.
        just give us a shout at support@fitway.com
        We're here to help! Thanks a bunch!
      </p>
      <p>Best,<br />Mostafa Rabi<br />Founder | Fitway</p>
    </div>
  </div>`,
  });

  console.log("Message sent: %s", info.messageId);
};
