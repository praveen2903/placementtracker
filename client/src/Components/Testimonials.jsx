import { Rating } from "@material-tailwind/react";

const testimonials = [
  {
    quote:
      "“Finally, I've found a company that delivers outstanding results in digital marketing, education, and hospitality. This portal has exceeded my expectations, and helped me to obtain suitable job.”",
    author: "Chandra Prakash Babu",
    position: "CSE, VVIT college",
    avatar: "https://booktalks.s3.ap-south-1.amazonaws.com/istockphoto-1305665241-1024x1024.jpg",
  },
  {
    quote:
      "“Working with this website has been a game-changer for my online presence. Their strategic approach and attention to detail have boosted my brand's visibility and engagement. I highly recommend their services.”",
    author: "Surya",
    position: "AIML, RVRJC college",
    avatar: "https://booktalks.s3.ap-south-1.amazonaws.com/istockphoto-1305665241-1024x1024.jpg",
  },
  {
    quote:
      "“ Job Portal is a reliable partner that has enhanced job opportunities. Their team's expertise and innovative solutions have significantly increased our online reach and conversions. We're thrilled with the results.”",
    author: "Sajid",
    position: "EEE, VRSEC college",
    avatar: "https://booktalks.s3.ap-south-1.amazonaws.com/istockphoto-1305665241-1024x1024.jpg",
  },
];

const Testimonial = () => {
  return (
    <section className="py-12 bg-[#fff3e0] item" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Our Client&apos;s Words
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="max-w-md mx-auto rounded-md border-2 border-brown-400 shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="mb-4 flex space-x-1">
                  <Rating value={5} readonly/>
                </div>
                <p className="text-lg text-gray-800">{testimonial.quote}</p>
              </div>
              <div className="border-t border-gray-200 py-4 px-6 flex items-center">
                <img
                  className="h-10 w-10 rounded-full object-cover mr-4"
                  src={testimonial.avatar}
                  alt="Testimonial Avatar"
                />
                <div>
                  <p className="text-base font-semibold text-gray-800">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;