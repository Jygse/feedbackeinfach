interface FeedbackData {
  rating: number;
  comment: string;
  timestamp: string;
  userAgent: string;
  source: string;
}

const WEBHOOK_URL = 'https://auto.iws-kruza.de/webhook-test/aa064f85-5744-441a-be96-e0ebaf2a7f53';

export const submitFeedback = async (rating: number, comment: string): Promise<void> => {
  const feedbackData: FeedbackData = {
    rating,
    comment: comment.trim(),
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    source: 'feedback-form'
  };

  console.log('Submitting feedback to:', WEBHOOK_URL);
  console.log('Feedback data:', feedbackData);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(feedbackData),
      mode: 'cors',
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error details available');
      console.error('Server response:', errorText);
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    // Try to parse response as JSON, but don't fail if it's not JSON
    let result = null;
    try {
      const responseText = await response.text();
      if (responseText) {
        result = JSON.parse(responseText);
      }
    } catch (parseError) {
      console.log('Response is not JSON, but request was successful');
    }
    
    console.log('Feedback submitted successfully:', result);
    
  } catch (error) {
    console.error('Failed to submit feedback:', error);
    
    // Provide more specific error messages
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the feedback service. Please check your internet connection.');
    } else if (error instanceof Error && error.message.includes('404')) {
      throw new Error('Feedback service not found. The webhook endpoint may be temporarily unavailable.');
    } else if (error instanceof Error && error.message.includes('CORS')) {
      throw new Error('Cross-origin request blocked. Please contact support.');
    } else {
      throw new Error('Failed to submit feedback. Please try again later.');
    }
  }
};
