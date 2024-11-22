// This is the server component (page.tsx)
import FeedbackPageClient from '@/components/feedback';

interface PageProps {
  params: {
    id: string;
  };
}


export default async function FeedbackPage({ params }: PageProps) {
  // Await the params to ensure they are resolved
  const { id: bookingId } = await params;

  return <FeedbackPageClient bookingId={bookingId} />;
}

// ... existing code ...