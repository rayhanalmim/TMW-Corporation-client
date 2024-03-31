
const Title = ({title}) => {
    return (
        <div className="relative border-s-8 border-orange-500 ">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold z-20">{title}</h2>
        </div>
    );
};

export default Title;