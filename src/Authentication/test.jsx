import React from 'react';
import { AvField, AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Label } from 'reactstrap';

const Example = () => {
    return (
        <div class="container">
            <br />
            <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                    <form role="form">
                        <div class="form-group has-warning">
                            <label class="control-label" for="inputWarning">Input with warning</label>
                            <input type="text" class="form-control" id="inputWarning" />
                            <span class="help-block">Something may have gone wrong</span>
                        </div>
                        <div class="form-group has-error">
                            <label class="control-label" for="inputError">Input with error</label>
                            <input type="text" class="form-control" id="inputError" />
                            <span class="help-block">Please correct the error</span>
                        </div>
                        <div class="form-group has-success">
                            <label class="control-label" for="inputSuccess">Input with success</label>
                            <input type="text" class="form-control" id="inputSuccess" />
                            <span class="help-block">Woohoo!</span>
                        </div>
                    </form>
                </div>
                <div class="col-md-3"></div>
            </div>
        </div>

    );
};

export default Example;