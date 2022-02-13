import React, {useEffect, useState} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const HorizontalStepper = (props) => {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const steps = props.steps;

    useEffect(() => {
        props.horizontalStepperHandleNext.current = handleNext
    }, [])

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            return props.onComplete();
        }

        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!steps[activeStep].optional) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        if (activeStep === steps.length - 1) {
            return props.onComplete();
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        steps && steps.length > 0 &&
        <div>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset}>
                            Reset
                        </Button>
                    </div>
                ) : (
                    <div>
                        {props.children[activeStep]}
                    </div>
                )}
            </div>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) =>
                    <Step key={step.title}>
                        <StepLabel>
                            <Typography>{step.title} </Typography>
                            {step.optional && <Typography variant="caption">Optional</Typography>}
                        </StepLabel>
                    </Step>
                )}
            </Stepper>

            <div>
                {steps[activeStep].optional && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSkip}
                    >
                        Skip
                    </Button>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    type={"submit"}
                    form={steps[activeStep].actionForm}
                >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </div>
        </div>
    );
}

export default HorizontalStepper
