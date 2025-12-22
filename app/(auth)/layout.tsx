import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* النصف الأول: صورة اللوجو أو خلفية دعائية */}
      <div className="hidden lg:flex lg:w-1/2  items-center justify-center p-12">
        <div className="text-black text-center">
          {/* ضع اللوجو الخاص بك هنا */}
          
                <Image 
                  src="/images/login-cover.png"
                  width={600}
                  height={600}
                  alt="El-Foly Logo"
                />
               
          <h2 className="text-4xl font-bold mb-4">مرحباً بك في منصتنا</h2>
          <p className="text-lg opacity-80">ابدأ رحلتك معنا اليوم واستمتع بكافة المميزات.</p>
        </div>
      </div>

      {/* النصف الثاني: الجزء المتغير (Login أو Signup) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-base-100 p-8">
        <div className="w-full max-w-md">
          {children} {/* هنا سيظهر محتوى صفحة login أو signup */}
        </div>
      </div>
    </div>
  );
}