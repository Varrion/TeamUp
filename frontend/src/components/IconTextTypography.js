import Typography from "@material-ui/core/Typography";
import {Col, Row} from "react-bootstrap";
import {Box} from "@material-ui/core";

const IconTextTypography = (props) => {
    const unknown = "Unknown";

    return (
        <Typography component={"div"} color={"textSecondary"}>
            <Row className={props.class}>
                {props.icon}
                <Col>
                    <Box>
                        {props.text ?? unknown}
                    </Box>
                    <Box className={"font-weight-bold"}>
                        {props.caption}
                    </Box>
                </Col>
            </Row>
        </Typography>
    )
}

export default IconTextTypography;
