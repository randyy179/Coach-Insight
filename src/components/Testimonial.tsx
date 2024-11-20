import { Quote } from 'lucide-react';

interface TestimonialProps {
  text: string;
  author: string;
  role: string;
}

export function Testimonial({ text, author, role }: TestimonialProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg relative">
      <Quote className="text-blue-500 w-8 h-8 absolute -top-4 -left-2" />
      <p className="text-gray-700 italic mb-4">{text}</p>
      <div className="flex items-center gap-2">
        <div>
          <p className="font-semibold text-gray-900">{author}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
}