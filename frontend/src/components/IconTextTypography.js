import Typography from "@material-ui/core/Typography";
import {Col, Row} from "react-bootstrap";
import {Box} from "@material-ui/core";

const IconTextTypography = (props) => {
    const unknown = "Unknown";

    return (
        <Typography className={props.class} component={"div"} color={"textSecondary"}>
            <Row>
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
