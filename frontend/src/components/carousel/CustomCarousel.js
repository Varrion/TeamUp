import {Carousel} from "react-bootstrap";

const CustomCarousel = ({height, children}) => {
    return (
        <Carousel fade style={{height: height}}>
            {children}
        </Carousel>
    )
}

export default CustomCarousel;