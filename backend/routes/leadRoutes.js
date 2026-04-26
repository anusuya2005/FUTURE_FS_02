const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { protect } = require('../middleware/authMiddleware');
const sendEmail = require('../utils/sendEmail');

// Live frontend URL
const FRONTEND_URL = 'https://future-fs-02-fqpklg466-anusuya2005s-projects.vercel.app';

// Email template
const getStatusEmail = (lead) => {
  const colors = {
    New: '#6366f1',
    Contacted: '#f59e0b',
    Converted: '#10b981'
  };

  const messages = {
    New: 'We have received your inquiry and will review it shortly.',
    Contacted: 'Great news! Our team has reviewed your inquiry and will be reaching out to you very soon.',
    Converted: 'Congratulations! Your application has been approved. Welcome aboard!'
  };

  const icons = {
    New: '📋',
    Contacted: '📞',
    Converted: '✅'
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0; padding:0; background:#f1f5f9;
      font-family:'Segoe UI',Arial,sans-serif;">

      <div style="max-width:560px; margin:40px auto; background:white;
        border-radius:16px; overflow:hidden;
        box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);
          padding:40px 32px; text-align:center;">
          <div style="font-size:48px; margin-bottom:12px;">
            ${icons[lead.status]}
          </div>
          <h1 style="color:white; margin:0; font-size:24px; font-weight:800;">
            Application Status Update
          </h1>
          <p style="color:rgba(255,255,255,0.8); margin:8px 0 0; font-size:14px;">
            Mini CRM — Lead Management System
          </p>
        </div>

        <!-- Body -->
        <div style="padding:36px 32px;">
          <p style="color:#64748b; font-size:15px; margin:0 0 24px;">
            Hi <strong style="color:#1e293b;">${lead.name}</strong>,
          </p>

          <p style="color:#64748b; font-size:15px;
            margin:0 0 28px; line-height:1.6;">
            ${messages[lead.status]}
          </p>

          <!-- Status Badge -->
          <div style="background:#f8fafc; border:1px solid #e2e8f0;
            border-radius:12px; padding:20px 24px; margin-bottom:28px;">
            <p style="margin:0 0 8px; color:#94a3b8; font-size:12px;
              font-weight:700; text-transform:uppercase; letter-spacing:1px;">
              Current Status
            </p>
            <div style="display:inline-block;
              background:${colors[lead.status]}20;
              color:${colors[lead.status]};
              padding:8px 20px; border-radius:20px;
              font-weight:800; font-size:16px;
              border:2px solid ${colors[lead.status]}40;">
              ${icons[lead.status]} ${lead.status}
            </div>
          </div>

          <!-- Notes if any -->
          ${lead.notes ? `
          <div style="background:#f8fafc;
            border-left:4px solid #6366f1;
            border-radius:0 12px 12px 0;
            padding:16px 20px; margin-bottom:28px;">
            <p style="margin:0 0 6px; color:#94a3b8; font-size:12px;
              font-weight:700; text-transform:uppercase;">
              Message from our team
            </p>
            <p style="margin:0; color:#475569;
              font-size:14px; line-height:1.6;">
              ${lead.notes}
            </p>
          </div>
          ` : ''}

          <!-- Your Details -->
          <div style="background:#f8fafc; border:1px solid #e2e8f0;
            border-radius:12px; padding:20px 24px; margin-bottom:28px;">
            <p style="margin:0 0 12px; color:#94a3b8; font-size:12px;
              font-weight:700; text-transform:uppercase; letter-spacing:1px;">
              Your Details
            </p>
            <p style="margin:0 0 6px; color:#475569; font-size:14px;">
              📧 Email: <strong>${lead.email}</strong>
            </p>
            <p style="margin:0; color:#475569; font-size:14px;">
              📱 Source: <strong>${lead.source}</strong>
            </p>
          </div>

          <!-- Track Status Button -->
          <div style="text-align:center; margin-bottom:28px;">
            <a href="${FRONTEND_URL}/track"
              style="display:inline-block;
              background:linear-gradient(135deg,#6366f1,#8b5cf6);
              color:white; text-decoration:none;
              padding:14px 32px; border-radius:10px;
              font-weight:700; font-size:15px;
              box-shadow:0 4px 12px rgba(99,102,241,0.4);">
              Track Your Application →
            </a>
          </div>

          <!-- Instructions -->
          <div style="background:#eff6ff; border:1px solid #bfdbfe;
            border-radius:10px; padding:16px 20px; margin-bottom:28px;">
            <p style="margin:0 0 8px; color:#1d4ed8; font-size:13px;
              font-weight:700;">
              📌 How to track your status:
            </p>
            <p style="margin:0; color:#3b82f6; font-size:13px; line-height:1.6;">
              1. Click the button above<br>
              2. Enter your email: <strong>${lead.email}</strong><br>
              3. Click Track My Application<br>
              4. See your current status and updates
            </p>
          </div>

          <p style="color:#94a3b8; font-size:13px;
            text-align:center; margin:0; line-height:1.6;">
            If you have questions simply reply to this email.
            We are here to help!
          </p>
        </div>

        <!-- Footer -->
        <div style="background:#f8fafc; padding:20px 32px;
          text-align:center; border-top:1px solid #e2e8f0;">
          <p style="margin:0; color:#94a3b8; font-size:12px;">
            © 2026 Mini CRM · Lead Management System
          </p>
        </div>

      </div>
    </body>
    </html>
  `;
};

// GET all leads (admin only)
router.get('/', protect, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET lead by email (public - status tracking)
router.get('/track/:email', async (req, res) => {
  try {
    const leads = await Lead.find({
      email: req.params.email.toLowerCase()
    }).sort({ createdAt: -1 });

    if (!leads.length) {
      return res.status(404).json({
        message: 'No leads found with this email.'
      });
    }

    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new lead (public - contact form)
router.post('/', async (req, res) => {
  const { name, email, phone, source, notes } = req.body;
  try {
    const lead = await Lead.create({
      name,
      email: email.toLowerCase(),
      phone,
      source,
      notes
    });

    // Send confirmation email
    await sendEmail({
      to: lead.email,
      subject: '✅ We received your inquiry — Mini CRM',
      html: getStatusEmail(lead)
    });

    res.status(201).json(lead);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update lead (admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const oldLead = await Lead.findById(req.params.id);
    const updated = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Send email only if status changed
    if (oldLead.status !== updated.status) {
      await sendEmail({
        to: updated.email,
        subject: `📬 Status Update: ${updated.status} — Mini CRM`,
        html: getStatusEmail(updated)
      });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE lead (admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;