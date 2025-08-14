// Email notification system for progress updates and milestones
export interface EmailSubscriber {
  id: string
  email: string
  name?: string
  subscriptionDate: string
  preferences: {
    milestones: boolean
    progress: boolean
    announcements: boolean
    research: boolean
    categories: string[] // company, cybersecurity, education, healthcare, supply-chain, team
  }
  status: "active" | "unsubscribed" | "bounced"
  lastEmailSent?: string
}

export interface EmailTemplate {
  id: string
  name: string
  type: "milestone" | "progress" | "announcement" | "research" | "digest"
  subject: string
  htmlContent: string
  textContent: string
  variables: string[] // Available template variables
}

export interface EmailNotification {
  id: string
  updateId: string
  subscriberId: string
  templateId: string
  status: "pending" | "sent" | "failed" | "bounced"
  sentAt?: string
  openedAt?: string
  clickedAt?: string
  errorMessage?: string
}

// Load subscribers from localStorage
export function loadSubscribers(): EmailSubscriber[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem("innovia_email_subscribers")
  if (stored) {
    return JSON.parse(stored)
  }

  // Default test subscribers
  return [
    {
      id: "sub-1",
      email: "demo@example.com",
      name: "Demo User",
      subscriptionDate: "2025-01-15",
      preferences: {
        milestones: true,
        progress: true,
        announcements: true,
        research: false,
        categories: ["company", "cybersecurity", "education"],
      },
      status: "active",
    },
    {
      id: "sub-2",
      email: "investor@example.com",
      name: "Investor Relations",
      subscriptionDate: "2025-01-10",
      preferences: {
        milestones: true,
        progress: false,
        announcements: true,
        research: false,
        categories: ["company"],
      },
      status: "active",
    },
  ]
}

// Save subscribers to localStorage
export function saveSubscribers(subscribers: EmailSubscriber[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("innovia_email_subscribers", JSON.stringify(subscribers))
}

// Add new subscriber
export function addSubscriber(subscriber: Omit<EmailSubscriber, "id" | "subscriptionDate" | "status">): string {
  const subscribers = loadSubscribers()
  const newSubscriber: EmailSubscriber = {
    ...subscriber,
    id: `sub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    subscriptionDate: new Date().toISOString().split("T")[0],
    status: "active",
  }

  subscribers.push(newSubscriber)
  saveSubscribers(subscribers)
  return newSubscriber.id
}

// Update subscriber preferences
export function updateSubscriberPreferences(
  subscriberId: string,
  preferences: Partial<EmailSubscriber["preferences"]>,
): void {
  const subscribers = loadSubscribers()
  const subscriberIndex = subscribers.findIndex((s) => s.id === subscriberId)

  if (subscriberIndex >= 0) {
    subscribers[subscriberIndex].preferences = {
      ...subscribers[subscriberIndex].preferences,
      ...preferences,
    }
    saveSubscribers(subscribers)
  }
}

// Unsubscribe user
export function unsubscribeUser(subscriberId: string): void {
  const subscribers = loadSubscribers()
  const subscriberIndex = subscribers.findIndex((s) => s.id === subscriberId)

  if (subscriberIndex >= 0) {
    subscribers[subscriberIndex].status = "unsubscribed"
    saveSubscribers(subscribers)
  }
}

// Get email templates
export function getEmailTemplates(): EmailTemplate[] {
  return [
    {
      id: "milestone-template",
      name: "Milestone Achievement",
      type: "milestone",
      subject: "🎯 Major Milestone: {{title}}",
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>{{title}}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f3f4f6; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 40px 20px; text-align: center; }
            .logo { width: 60px; height: 60px; margin: 0 auto 20px; }
            .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; }
            .content { padding: 40px 20px; }
            .milestone-badge { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block; margin-bottom: 20px; }
            .title { font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 16px; }
            .summary { font-size: 16px; color: #6b7280; line-height: 1.6; margin-bottom: 30px; }
            .metrics { display: flex; flex-wrap: wrap; gap: 20px; margin: 30px 0; }
            .metric { background: #f9fafb; padding: 20px; border-radius: 8px; text-align: center; flex: 1; min-width: 120px; }
            .metric-value { font-size: 24px; font-weight: bold; color: #3b82f6; }
            .metric-label { font-size: 14px; color: #6b7280; margin-top: 4px; }
            .achievements { background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0; }
            .achievements h3 { color: #065f46; margin: 0 0 15px 0; font-size: 18px; }
            .achievement { display: flex; align-items: flex-start; margin-bottom: 12px; }
            .achievement-bullet { width: 8px; height: 8px; background: #10b981; border-radius: 50%; margin-top: 6px; margin-right: 12px; flex-shrink: 0; }
            .cta { text-align: center; margin: 40px 0; }
            .cta-button { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; }
            .footer { background: #1f2937; color: #9ca3af; padding: 30px 20px; text-align: center; font-size: 14px; }
            .footer a { color: #60a5fa; text-decoration: none; }
            .unsubscribe { margin-top: 20px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">
                <img src="{{logoUrl}}" alt="InnovIA Technologies" style="width: 60px; height: 60px;">
              </div>
              <h1>InnovIA Technologies</h1>
            </div>
            
            <div class="content">
              <div class="milestone-badge">🎯 MILESTONE ACHIEVED</div>
              <h2 class="title">{{title}}</h2>
              <p class="summary">{{summary}}</p>
              
              {{#if metrics}}
              <div class="metrics">
                {{#each metrics}}
                <div class="metric">
                  <div class="metric-value">{{value}}</div>
                  <div class="metric-label">{{label}}</div>
                </div>
                {{/each}}
              </div>
              {{/if}}
              
              {{#if achievements}}
              <div class="achievements">
                <h3>Key Achievements</h3>
                {{#each achievements}}
                <div class="achievement">
                  <div class="achievement-bullet"></div>
                  <div>{{this}}</div>
                </div>
                {{/each}}
              </div>
              {{/if}}
              
              <div class="cta">
                <a href="{{readMoreUrl}}" class="cta-button">Read Full Update</a>
              </div>
            </div>
            
            <div class="footer">
              <p>© 2025 InnovIA Technologies. All rights reserved.</p>
              <p>2120 Rue Phil Goyette, Vaudreuil-Dorion, QC J7V 3E5, Canada</p>
              <div class="unsubscribe">
                <a href="{{unsubscribeUrl}}">Unsubscribe</a> | 
                <a href="{{preferencesUrl}}">Update Preferences</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      textContent: `
🎯 MILESTONE ACHIEVED: {{title}}

{{summary}}

{{#if achievements}}
Key Achievements:
{{#each achievements}}
• {{this}}
{{/each}}
{{/if}}

Read the full update: {{readMoreUrl}}

---
InnovIA Technologies
2120 Rue Phil Goyette, Vaudreuil-Dorion, QC J7V 3E5, Canada

Unsubscribe: {{unsubscribeUrl}}
Update Preferences: {{preferencesUrl}}
      `,
      variables: [
        "title",
        "summary",
        "metrics",
        "achievements",
        "readMoreUrl",
        "logoUrl",
        "unsubscribeUrl",
        "preferencesUrl",
      ],
    },
    {
      id: "progress-template",
      name: "Progress Update",
      type: "progress",
      subject: "📈 Progress Update: {{title}}",
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>{{title}}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f3f4f6; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); padding: 40px 20px; text-align: center; }
            .logo { width: 60px; height: 60px; margin: 0 auto 20px; }
            .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; }
            .content { padding: 40px 20px; }
            .progress-badge { background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block; margin-bottom: 20px; }
            .title { font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 16px; }
            .summary { font-size: 16px; color: #6b7280; line-height: 1.6; margin-bottom: 30px; }
            .category-tag { background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; display: inline-block; margin-bottom: 20px; }
            .metrics { display: flex; flex-wrap: wrap; gap: 20px; margin: 30px 0; }
            .metric { background: #f0f9ff; padding: 20px; border-radius: 8px; text-align: center; flex: 1; min-width: 120px; border-left: 4px solid #06b6d4; }
            .metric-value { font-size: 24px; font-weight: bold; color: #0891b2; }
            .metric-label { font-size: 14px; color: #6b7280; margin-top: 4px; }
            .metric-change { font-size: 12px; color: #059669; margin-top: 2px; }
            .cta { text-align: center; margin: 40px 0; }
            .cta-button { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; }
            .footer { background: #1f2937; color: #9ca3af; padding: 30px 20px; text-align: center; font-size: 14px; }
            .footer a { color: #60a5fa; text-decoration: none; }
            .unsubscribe { margin-top: 20px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">
                <img src="{{logoUrl}}" alt="InnovIA Technologies" style="width: 60px; height: 60px;">
              </div>
              <h1>InnovIA Technologies</h1>
            </div>
            
            <div class="content">
              <div class="progress-badge">📈 PROGRESS UPDATE</div>
              <div class="category-tag">{{category}}</div>
              <h2 class="title">{{title}}</h2>
              <p class="summary">{{summary}}</p>
              
              {{#if metrics}}
              <div class="metrics">
                {{#each metrics}}
                <div class="metric">
                  <div class="metric-value">{{value}}</div>
                  <div class="metric-label">{{label}}</div>
                  {{#if change}}<div class="metric-change">{{change}}</div>{{/if}}
                </div>
                {{/each}}
              </div>
              {{/if}}
              
              <div class="cta">
                <a href="{{readMoreUrl}}" class="cta-button">Read Full Update</a>
              </div>
            </div>
            
            <div class="footer">
              <p>© 2025 InnovIA Technologies. All rights reserved.</p>
              <p>2120 Rue Phil Goyette, Vaudreuil-Dorion, QC J7V 3E5, Canada</p>
              <div class="unsubscribe">
                <a href="{{unsubscribeUrl}}">Unsubscribe</a> | 
                <a href="{{preferencesUrl}}">Update Preferences</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      textContent: `
📈 PROGRESS UPDATE: {{title}}

Category: {{category}}

{{summary}}

{{#if metrics}}
Key Metrics:
{{#each metrics}}
• {{label}}: {{value}} {{#if change}}({{change}}){{/if}}
{{/each}}
{{/if}}

Read the full update: {{readMoreUrl}}

---
InnovIA Technologies
2120 Rue Phil Goyette, Vaudreuil-Dorion, QC J7V 3E5, Canada

Unsubscribe: {{unsubscribeUrl}}
Update Preferences: {{preferencesUrl}}
      `,
      variables: [
        "title",
        "summary",
        "category",
        "metrics",
        "readMoreUrl",
        "logoUrl",
        "unsubscribeUrl",
        "preferencesUrl",
      ],
    },
    {
      id: "announcement-template",
      name: "Announcement",
      type: "announcement",
      subject: "📢 Important Announcement: {{title}}",
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>{{title}}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f3f4f6; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); padding: 40px 20px; text-align: center; }
            .logo { width: 60px; height: 60px; margin: 0 auto 20px; }
            .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; }
            .content { padding: 40px 20px; }
            .announcement-badge { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block; margin-bottom: 20px; }
            .title { font-size: 24px; font-weight: bold; color: #1f2937; margin-bottom: 16px; }
            .summary { font-size: 16px; color: #6b7280; line-height: 1.6; margin-bottom: 30px; }
            .highlight-box { background: #faf5ff; border-left: 4px solid #8b5cf6; padding: 20px; margin: 30px 0; }
            .highlight-box h3 { color: #6b21a8; margin: 0 0 15px 0; font-size: 18px; }
            .cta { text-align: center; margin: 40px 0; }
            .cta-button { background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; }
            .footer { background: #1f2937; color: #9ca3af; padding: 30px 20px; text-align: center; font-size: 14px; }
            .footer a { color: #60a5fa; text-decoration: none; }
            .unsubscribe { margin-top: 20px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">
                <img src="{{logoUrl}}" alt="InnovIA Technologies" style="width: 60px; height: 60px;">
              </div>
              <h1>InnovIA Technologies</h1>
            </div>
            
            <div class="content">
              <div class="announcement-badge">📢 ANNOUNCEMENT</div>
              <h2 class="title">{{title}}</h2>
              <p class="summary">{{summary}}</p>
              
              <div class="highlight-box">
                <h3>What This Means</h3>
                <p>This announcement represents a significant step forward in our AI development journey and demonstrates our commitment to innovation and transparency.</p>
              </div>
              
              <div class="cta">
                <a href="{{readMoreUrl}}" class="cta-button">Read Full Announcement</a>
              </div>
            </div>
            
            <div class="footer">
              <p>© 2025 InnovIA Technologies. All rights reserved.</p>
              <p>2120 Rue Phil Goyette, Vaudreuil-Dorion, QC J7V 3E5, Canada</p>
              <div class="unsubscribe">
                <a href="{{unsubscribeUrl}}">Unsubscribe</a> | 
                <a href="{{preferencesUrl}}">Update Preferences</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      textContent: `
📢 ANNOUNCEMENT: {{title}}

{{summary}}

What This Means:
This announcement represents a significant step forward in our AI development journey and demonstrates our commitment to innovation and transparency.

Read the full announcement: {{readMoreUrl}}

---
InnovIA Technologies
2120 Rue Phil Goyette, Vaudreuil-Dorion, QC J7V 3E5, Canada

Unsubscribe: {{unsubscribeUrl}}
Update Preferences: {{preferencesUrl}}
      `,
      variables: ["title", "summary", "readMoreUrl", "logoUrl", "unsubscribeUrl", "preferencesUrl"],
    },
    {
      id: "weekly-digest-template",
      name: "Weekly Digest",
      type: "digest",
      subject: "📊 Weekly Progress Digest - {{weekOf}}",
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Weekly Progress Digest</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f3f4f6; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #1f2937 0%, #374151 100%); padding: 40px 20px; text-align: center; }
            .logo { width: 60px; height: 60px; margin: 0 auto 20px; }
            .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; }
            .header p { color: #d1d5db; margin: 10px 0 0 0; }
            .content { padding: 40px 20px; }
            .digest-badge { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block; margin-bottom: 30px; }
            .update-item { border-left: 4px solid #e5e7eb; padding-left: 20px; margin-bottom: 30px; }
            .update-item.milestone { border-left-color: #10b981; }
            .update-item.progress { border-left-color: #06b6d4; }
            .update-item.announcement { border-left-color: #8b5cf6; }
            .update-title { font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 8px; }
            .update-summary { font-size: 14px; color: #6b7280; line-height: 1.5; margin-bottom: 10px; }
            .update-meta { font-size: 12px; color: #9ca3af; }
            .stats-grid { display: flex; flex-wrap: wrap; gap: 15px; margin: 30px 0; }
            .stat-item { background: #f9fafb; padding: 15px; border-radius: 8px; text-align: center; flex: 1; min-width: 100px; }
            .stat-value { font-size: 20px; font-weight: bold; color: #3b82f6; }
            .stat-label { font-size: 12px; color: #6b7280; margin-top: 4px; }
            .cta { text-align: center; margin: 40px 0; }
            .cta-button { background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; }
            .footer { background: #1f2937; color: #9ca3af; padding: 30px 20px; text-align: center; font-size: 14px; }
            .footer a { color: #60a5fa; text-decoration: none; }
            .unsubscribe { margin-top: 20px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">
                <img src="{{logoUrl}}" alt="InnovIA Technologies" style="width: 60px; height: 60px;">
              </div>
              <h1>InnovIA Technologies</h1>
              <p>Weekly Progress Digest</p>
            </div>
            
            <div class="content">
              <div class="digest-badge">📊 WEEKLY DIGEST</div>
              <h2>Week of {{weekOf}}</h2>
              
              <div class="stats-grid">
                <div class="stat-item">
                  <div class="stat-value">{{totalUpdates}}</div>
                  <div class="stat-label">Total Updates</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{milestones}}</div>
                  <div class="stat-label">Milestones</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{progressUpdates}}</div>
                  <div class="stat-label">Progress Updates</div>
                </div>
              </div>
              
              {{#each updates}}
              <div class="update-item {{type}}">
                <div class="update-title">{{title}}</div>
                <div class="update-summary">{{summary}}</div>
                <div class="update-meta">{{category}} • {{date}}</div>
              </div>
              {{/each}}
              
              <div class="cta">
                <a href="{{allUpdatesUrl}}" class="cta-button">View All Updates</a>
              </div>
            </div>
            
            <div class="footer">
              <p>© 2025 InnovIA Technologies. All rights reserved.</p>
              <p>2120 Rue Phil Goyette, Vaudreuil-Dorion, QC J7V 3E5, Canada</p>
              <div class="unsubscribe">
                <a href="{{unsubscribeUrl}}">Unsubscribe</a> | 
                <a href="{{preferencesUrl}}">Update Preferences</a>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      textContent: `
📊 WEEKLY PROGRESS DIGEST - Week of {{weekOf}}

This Week's Summary:
• {{totalUpdates}} Total Updates
• {{milestones}} Milestones
• {{progressUpdates}} Progress Updates

{{#each updates}}
{{title}}
{{summary}}
Category: {{category}} • {{date}}

{{/each}}

View all updates: {{allUpdatesUrl}}

---
InnovIA Technologies
2120 Rue Phil Goyette, Vaudreuil-Dorion, QC J7V 3E5, Canada

Unsubscribe: {{unsubscribeUrl}}
Update Preferences: {{preferencesUrl}}
      `,
      variables: [
        "weekOf",
        "totalUpdates",
        "milestones",
        "progressUpdates",
        "updates",
        "allUpdatesUrl",
        "logoUrl",
        "unsubscribeUrl",
        "preferencesUrl",
      ],
    },
  ]
}

// Get subscribers who should receive notifications for a specific update
export function getRelevantSubscribers(updateType: string, updateCategory: string): EmailSubscriber[] {
  const subscribers = loadSubscribers()

  return subscribers.filter((subscriber) => {
    if (subscriber.status !== "active") return false

    // Check if subscriber wants this type of update
    const wantsType = subscriber.preferences[updateType as keyof typeof subscriber.preferences]
    if (!wantsType) return false

    // Check if subscriber wants updates from this category
    const wantsCategory = subscriber.preferences.categories.includes(updateCategory)
    if (!wantsCategory) return false

    return true
  })
}

// Load email notifications from localStorage
export function loadEmailNotifications(): EmailNotification[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem("innovia_email_notifications")
  if (stored) {
    return JSON.parse(stored)
  }

  return []
}

// Save email notifications to localStorage
export function saveEmailNotifications(notifications: EmailNotification[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("innovia_email_notifications", JSON.stringify(notifications))
}

// Queue email notification
export function queueEmailNotification(updateId: string, subscriberId: string, templateId: string): string {
  const notifications = loadEmailNotifications()
  const notification: EmailNotification = {
    id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    updateId,
    subscriberId,
    templateId,
    status: "pending",
  }

  notifications.push(notification)
  saveEmailNotifications(notifications)
  return notification.id
}

// Process template variables
export function processTemplate(
  template: EmailTemplate,
  variables: Record<string, any>,
): { subject: string; htmlContent: string; textContent: string } {
  let subject = template.subject
  let htmlContent = template.htmlContent
  let textContent = template.textContent

  // Simple template variable replacement
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, "g")
    subject = subject.replace(regex, String(value))
    htmlContent = htmlContent.replace(regex, String(value))
    textContent = textContent.replace(regex, String(value))
  })

  // Handle conditional blocks (simplified)
  const conditionalRegex = /{{#if (\w+)}}([\s\S]*?){{\/if}}/g
  htmlContent = htmlContent.replace(conditionalRegex, (match, condition, content) => {
    return variables[condition] ? content : ""
  })
  textContent = textContent.replace(conditionalRegex, (match, condition, content) => {
    return variables[condition] ? content : ""
  })

  // Handle each blocks (simplified)
  const eachRegex = /{{#each (\w+)}}([\s\S]*?){{\/each}}/g
  htmlContent = htmlContent.replace(eachRegex, (match, arrayName, itemTemplate) => {
    const array = variables[arrayName]
    if (!Array.isArray(array)) return ""

    return array
      .map((item) => {
        let itemContent = itemTemplate
        if (typeof item === "object") {
          Object.entries(item).forEach(([key, value]) => {
            const itemRegex = new RegExp(`{{${key}}}`, "g")
            itemContent = itemContent.replace(itemRegex, String(value))
          })
        } else {
          itemContent = itemContent.replace(/{{this}}/g, String(item))
        }
        return itemContent
      })
      .join("")
  })

  textContent = textContent.replace(eachRegex, (match, arrayName, itemTemplate) => {
    const array = variables[arrayName]
    if (!Array.isArray(array)) return ""

    return array
      .map((item) => {
        let itemContent = itemTemplate
        if (typeof item === "object") {
          Object.entries(item).forEach(([key, value]) => {
            const itemRegex = new RegExp(`{{${key}}}`, "g")
            itemContent = itemContent.replace(itemRegex, String(value))
          })
        } else {
          itemContent = itemContent.replace(/{{this}}/g, String(item))
        }
        return itemContent
      })
      .join("")
  })

  return { subject, htmlContent, textContent }
}

// Simulate sending email (in real implementation, this would use an email service)
export async function sendEmail(
  to: string,
  subject: string,
  htmlContent: string,
  textContent: string,
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simulate 95% success rate
  const success = Math.random() > 0.05

  if (success) {
    console.log(`📧 Email sent to ${to}: ${subject}`)
    return {
      success: true,
      messageId: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }
  } else {
    console.error(`❌ Failed to send email to ${to}: ${subject}`)
    return {
      success: false,
      error: "SMTP connection failed",
    }
  }
}

// Mark notification as sent
export function markNotificationSent(notificationId: string, messageId?: string): void {
  const notifications = loadEmailNotifications()
  const notificationIndex = notifications.findIndex((n) => n.id === notificationId)

  if (notificationIndex >= 0) {
    notifications[notificationIndex].status = "sent"
    notifications[notificationIndex].sentAt = new Date().toISOString()
    saveEmailNotifications(notifications)
  }
}

// Mark notification as failed
export function markNotificationFailed(notificationId: string, error: string): void {
  const notifications = loadEmailNotifications()
  const notificationIndex = notifications.findIndex((n) => n.id === notificationId)

  if (notificationIndex >= 0) {
    notifications[notificationIndex].status = "failed"
    notifications[notificationIndex].errorMessage = error
    saveEmailNotifications(notifications)
  }
}

// Generate unsubscribe URL
export function generateUnsubscribeUrl(subscriberId: string): string {
  return `${window.location.origin}/unsubscribe?id=${subscriberId}`
}

// Generate preferences URL
export function generatePreferencesUrl(subscriberId: string): string {
  return `${window.location.origin}/email-preferences?id=${subscriberId}`
}
