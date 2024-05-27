import {useState} from "react";

interface HorizontalNumberSliderProps {
    min: number;
    max: number;
    onSelect: (number: number) => void;
}

const HorizontalNumberSlider: React.FC<HorizontalNumberSliderProps> = ({ min, max, onSelect }) => {
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

    const handleSelect = (number: number) => {
        setSelectedNumber(number);
        onSelect(number);
    };

    const renderNumbers = () => {
        const numbers = [];
        for (let i = min; i <= max; i++) {
            numbers.push(
                <div
                    key={i}
                    className={`number-item ${selectedNumber === i ? 'selected' : ''}`}
                    onClick={() => handleSelect(i)}
                >
                    {i}
                </div>
            );
        }
        return numbers;
    };

    return <div className="horizontal-number-slider">{renderNumbers()}</div>;
};

export default HorizontalNumberSlider;