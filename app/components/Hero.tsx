
 interface Props{
    title:string, 
    subtitle:string
}
function HeroCommon({title, subtitle}: Props) {
  
  return (
    <div className="bg-[#2873B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center flex justify-center flex-col py-30">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
           {title}
          </h2>
          <p className="text-white pt-2">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeroCommon;
