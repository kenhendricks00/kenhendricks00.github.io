import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Intake Form | Kenneth Hendricks',
  description: 'Client intake form for web design services - helping us understand your project requirements and vision.',
  robots: 'noindex, nofollow', // Prevent search engines from indexing this private form
}

export default function IntakeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
