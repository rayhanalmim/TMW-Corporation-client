
const Title = ({title}) => {
    return (
        <div className="relative border-s-8 border-orange-500 ">
            <h2 className="text-6xl font-bold z-20">{title}</h2>
            <p className="absolute bottom-0 text-6xl md:text-7xl lg:text-8xl z-10 opacity-5 overflow-hidden">{title}</p>
        </div>
    );
};

export default Title;