const TitleTwo = ({ heading }) => {
    return (
        <div className="mx-auto text-center md:w-4/12 my-4 italic font-medium">
            <h3 className="text-3xl uppercase border-y-4 text-yellow-600 py-4">{heading}</h3>
        </div>
    );
};

export default TitleTwo;