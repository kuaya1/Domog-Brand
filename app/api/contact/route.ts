import { NextResponse } from 'next/server';

// Contact form submission handler
// In production, integrate with an email service like Resend, SendGrid, or Mailgun
// For now, this validates and logs submissions (you can add email integration later)

interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Subject options mapping
const subjectLabels: Record<string, string> = {
    general: 'General Inquiry',
    order: 'Order Question',
    custom: 'Custom Order',
    care: 'Care & Maintenance',
    wholesale: 'Wholesale Inquiry',
    press: 'Press & Media',
};

export async function POST(request: Request) {
    try {
        const body: ContactFormData = await request.json();
        
        // Validation
        const errors: string[] = [];
        
        if (!body.name || body.name.trim().length < 2) {
            errors.push('Name is required and must be at least 2 characters');
        }
        
        if (!body.email || !emailRegex.test(body.email)) {
            errors.push('A valid email address is required');
        }
        
        if (!body.subject) {
            errors.push('Please select a subject');
        }
        
        if (!body.message || body.message.trim().length < 10) {
            errors.push('Message is required and must be at least 10 characters');
        }
        
        if (errors.length > 0) {
            return NextResponse.json(
                { success: false, errors },
                { status: 400 }
            );
        }

        // Sanitize data
        const sanitizedData = {
            name: body.name.trim(),
            email: body.email.trim().toLowerCase(),
            phone: body.phone?.trim() || 'Not provided',
            subject: subjectLabels[body.subject] || body.subject,
            message: body.message.trim(),
            timestamp: new Date().toISOString(),
        };

        // Log the submission (visible in Vercel logs)
        console.log('📧 New Contact Form Submission:', JSON.stringify(sanitizedData, null, 2));

        // ============================================================
        // EMAIL INTEGRATION OPTIONS:
        // ============================================================
        // 
        // Option 1: Resend (recommended, simple setup)
        // -------------------------------------------------
        // import { Resend } from 'resend';
        // const resend = new Resend(process.env.RESEND_API_KEY);
        // 
        // await resend.emails.send({
        //     from: 'Domog Contact Form <domogbrand@gmail.com>',
        //     to: 'domogbrand@gmail.com',
        //     subject: `[${sanitizedData.subject}] New inquiry from ${sanitizedData.name}`,
        //     html: `
        //         <h2>New Contact Form Submission</h2>
        //         <p><strong>Name:</strong> ${sanitizedData.name}</p>
        //         <p><strong>Email:</strong> ${sanitizedData.email}</p>
        //         <p><strong>Phone:</strong> ${sanitizedData.phone}</p>
        //         <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
        //         <p><strong>Message:</strong></p>
        //         <p>${sanitizedData.message}</p>
        //     `,
        // });
        //
        // Option 2: SendGrid
        // -------------------------------------------------
        // import sgMail from '@sendgrid/mail';
        // sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
        // await sgMail.send({ ... });
        //
        // Option 3: Nodemailer (for SMTP)
        // -------------------------------------------------
        // import nodemailer from 'nodemailer';
        // const transporter = nodemailer.createTransport({ ... });
        // await transporter.sendMail({ ... });
        //
        // ============================================================

        // For production: Store in database (optional)
        // await prisma.contactSubmission.create({ data: sanitizedData });
        
        // Auto-reply to customer (with email service)
        // This provides immediate feedback that their message was received

        return NextResponse.json({
            success: true,
            message: 'Thank you for your message. Our team will respond within 24-48 hours.',
            reference: `DOM-${Date.now().toString(36).toUpperCase()}`,
        });

    } catch (error) {
        console.error('Contact form error:', error);
        
        return NextResponse.json(
            { 
                success: false, 
                errors: ['An unexpected error occurred. Please try again or email us directly at domogbrand@gmail.com'] 
            },
            { status: 500 }
        );
    }
}

// Health check
export async function GET() {
    return NextResponse.json({ 
        status: 'ok',
        endpoint: 'contact',
        note: 'Use POST to submit contact form' 
    });
}
