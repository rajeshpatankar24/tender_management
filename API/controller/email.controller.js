import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

function senMail(email, password) {
    // Create transporter using environment variables
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Email options with professional HTML template
    var mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to TechTender - Verify Your Account',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #f8f9fa;
                    }
                    .header {
                        background: linear-gradient(135deg, #2563eb 0%, #10b981 100%);
                        color: white;
                        padding: 30px;
                        text-align: center;
                        border-radius: 10px 10px 0 0;
                    }
                    .content {
                        background: white;
                        padding: 30px;
                        border-radius: 0 0 10px 10px;
                    }
                    .credentials {
                        background: #f1f5f9;
                        padding: 20px;
                        border-radius: 8px;
                        margin: 20px 0;
                    }
                    .button {
                        display: inline-block;
                        padding: 15px 30px;
                        background: linear-gradient(135deg, #2563eb, #10b981);
                        color: white;
                        text-decoration: none;
                        border-radius: 8px;
                        margin: 20px 0;
                        font-weight: bold;
                    }
                    .footer {
                        text-align: center;
                        padding: 20px;
                        color: #64748b;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Welcome to TechTender</h1>
                        <p>Digital Tender Management Platform</p>
                    </div>
                    <div class="content">
                        <h2>Account Created Successfully!</h2>
                        <p>Thank you for registering with TechTender. Your account has been created successfully.</p>
                        
                        <div class="credentials">
                            <h3>Your Login Credentials:</h3>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Password:</strong> ${password}</p>
                            <p style="color: #dc2626; font-size: 14px;">
                                <strong>⚠️ Important:</strong> Please change your password after your first login for security purposes.
                            </p>
                        </div>
                        
                        <p>To complete your registration and activate your account, please verify your email address by clicking the button below:</p>
                        
                        <center>
                            <a href="${process.env.FRONTEND_URL}/verify/${email}" class="button">
                                Verify Your Account
                            </a>
                        </center>
                        
                        <p style="margin-top: 30px;">If the button doesn't work, copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; color: #2563eb;">
                            ${process.env.FRONTEND_URL}/verify/${email}
                        </p>
                        
                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e2e8f0;">
                        
                        <h3>What's Next?</h3>
                        <ul>
                            <li>Verify your email address</li>
                            <li>Complete your profile</li>
                            <li>Browse available tenders</li>
                            <li>Start bidding on projects</li>
                        </ul>
                        
                        <p>If you didn't create this account, please ignore this email or contact our support team.</p>
                    </div>
                    <div class="footer">
                        <p>© 2025 TechTender by TechSolution. All rights reserved.</p>
                        <p>Need help? Contact us at ${process.env.EMAIL_USER}</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    // Send email with error handling
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log('❌ Email sending failed:', error);
        } else {
            console.log('✅ Email sent successfully:', info.response);
        }
    });
}

export default senMail;
