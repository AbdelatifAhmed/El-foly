import { Car, HandCoins, Headset } from "lucide-react";

const Services = () => {
    const Services = [
        {
            id: 1,
            Logo:<Car />,
            title: "Free and Fast Delivery",
            description: "Free delivery on all orders over $99",
        },
        {
            id: 2,
            Logo:<Headset />,
            title: "24/7 Customer Service",
            description: "Friendly 24/7 customer support" ,
        },
        {
            id: 3,
            Logo:<HandCoins />,
            title: "Money Back Guarantee",
            description: "We return money within 30 days" ,
        },
    ];
  return (
    <div className="grid lg:grid-cols-3 grid-col-1 gap-8  py-16">
        {Services.map((service) => (
            <div key={service.id} className="flex flex-col items-center gap-4">
                <div className="p-4 bg-black  border-gary-200 border-12 rounded-full text-white"> 
                    {service.Logo}
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="font-bold text-lg">{service.title}</h3>
                    <p className="text-gray-500">{service.description}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Services