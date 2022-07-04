import React from 'react'
import { Formik, Form as FmkForm } from 'formik'
import * as Yup from 'yup'
import styles from './formik.module.scss';
import FormControls from './FormControls';
import Grid from '@mui/material/Grid'
import { checkboxOptions, countryOptions, genderOptions, radioOptions, vehiclesOptions } from '../../lib/options';
import { defaultValues } from '../../lib/default';
import { Typography } from '@mui/material';

function Form() {


    const initialValues = {
        test: [],
        testNew: [],
        // firstName: '',
        // lastName: '',
        // email: '',
        // phone: '',
        // addressLine1: '',
        // addressLine2: '',
        // city: '',
        // state: '',
        // country: '',
        // arrivalDate: '',
        // departureDate: '',
        // message: '',
        // termsOfService: false,
        // gender: '',
        // vehiclesOwned: [],
        // familyMembers: [],
        phone: [],
        // ...defaultValues,
        // phone: {
        //      code: '',
        //      number: ''
        // },
        // description: '',
        // selectOption: '',
        // radioOption: '',
        // checkboxOption: [],
        // fieldArr: [''],
        // fieldArrPair: [['', '']],
    }
    const validationSchema = Yup.object({
        test: Yup.array().of(
            Yup.string().required('Cannot be empty')
        ),
        // create validation for array of strings
        testNew: Yup.array()
            // .min(2, 'Must have at least 2 items') // !FIXME: These won't work properly
            // .max(2, 'Select 02 options at max')
            .of( //TODO: How to limit the options to 'n' items with a proper error message?
                Yup.object().shape({
                    providerCode: Yup
                        .number()
                        .integer()
                        .typeError('Please Enter a valid Provider Code')
                        .required("Provider Code is required")
                    // !.length(4, 'Enter exactly 4 characters')
                    ,
                    telephoneNumber: Yup.string().required("Telephone Number is required")
                })
            ),



        // testNew: Yup.array().of,
        // firstName: Yup.string()
        //     .required('Required'),
        // lastName: Yup.string()
        //     .required('Required'),
        // email: Yup.string()
        //     .email('Invalid Email')
        //     .required('Required'),
        // phone: Yup.number()
        //     .integer()
        //     .typeError('Please Enter a valid Phone Number')
        //     .required('Required'),
        // addressLine1: Yup.string()
        //     .required('Required'),
        // addressLine2: Yup.string(),
        // city: Yup.string()
        //     .required('Required'),
        // state: Yup.string()
        //     .required('Required'),
        // country: Yup.string()
        //     .typeError('Choose a Valid Country')
        //     .required('Required'),
        // arrivalDate: Yup.date()
        //     .required('Required'),
        // departureDate: Yup.date()
        //     .required('Required'),
        // message: Yup.string().required('Required'),
        // termsOfService: Yup.boolean()
        //     .oneOf([true], 'The terms and conditions must be accepted.')
        //     .required('The terms and conditions must be accepted.'),
        // gender: Yup.string()
        //     .oneOf(Object.keys(genderOptions), 'Value is invalid')
        //     .required('Required'),
        // vehiclesOwned: Yup
        //     .array()
        //     .min(1, 'Select at-least 01 option')
        //     .max(2, 'Select 02 options at max'),
        // .oneOf([true], 'The terms and conditions must be accepted.')
        // .required('You must have at-least one mode of conveyance.'),
        // familyMembers: Yup.array()
        //     // .min(2, 'Must have at least 2 items') // !FIXME: These won't work properly
        //     // .max(2, 'Select 02 options at max')
        //     .of( //TODO: How to limit the options to 'n' items with a proper error message?
        //         Yup.string()
        //             .required('Cannot be empty')
        //     ),

        // ? check if the following is possible
        // phone: Yup.object().shape({
        //      code: Yup.string().required('Required'),
        //      number: Yup.string().required('Required'),
        // }),
        phone: Yup.array()
            .of(
                Yup.object().shape({
                    code: Yup
                        .number()
                        .integer()
                        .typeError('Please Enter a valid Code')
                        .required("Code is required")
                    ,
                    number: Yup
                        .number()
                        .integer()
                        .typeError('Please Enter a valid Number')
                        .required("Number is required")
                })
            ),
        // description: Yup.string().required('Required'),
        // selectOption: Yup.string().required('Required'),
        // radioOption: Yup.string().required('Required'),
        // checkboxOption: Yup.array().min(1, 'Select at-least 01 option').max(2, 'Select 02 options at max'),
        // fieldArr: Yup.array().min(1, 'Cannot be empty'),
        // fieldArrPair: Yup.array().min(1, 'Cannot be empty'),
    }
    )
    const onSubmit = values => {
        console.log('Form data', values)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {formik => {
                return (

                    <FmkForm className={styles.form} autoComplete='off' >
                        <Grid container spacing={2}>
                            {/* Country Select */}
                            {/* //! Create from Select Field (not from TextField-type:select) */}
                            {/* <Grid item xs={12}>
                                <FormControls.Select
                                    label='Country'
                                    name='country'
                                    multiple={true}
                                    options={countryOptions}
                                />
                            </Grid> */}


                            {/* Texts */}
                            {/* <Grid item xs={12} >
                                <FormControls.FieldArray
                                    legend='Phone Number'
                                    name='test'
                                    fieldName='Phone Number'
                                    showHelper
                                />
                            </Grid> */}
                            {/* <Grid item xs={12} >
                                <FormControls.FieldArrayNested
                                    legend='Phone Number'
                                    name='testNew'
                                    fieldName='Phone Number'
                                    structure={{
                                        providerCode: '',
                                        telephoneNumber: '',
                                    }}
                                // showHelper
                                // minFields/minItems/min // displays a min no. of text fields with disabled remove button
                                />

                            </Grid> */}

                            {/* Name */}
                            <Grid item xs={12}>
                                <Typography variant="h6" >Text Fields</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControls.TextField
                                    label='First Name'
                                    name='firstName'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControls.TextField
                                    label='Last Name'
                                    name='lastName'
                                />
                            </Grid>

                            {/* Contacts */}
                            {/* <Grid item xs={12}>
                                <Typography variant="h6" >Contacts</Typography>
                            </Grid> */}

                            {/* <Grid item xs={6}>
                                <FormControls.TextField
                                    type='email'
                                    label='Email'
                                    name='email'
                                />
                            </Grid> */}
                            {/* <Grid item xs={6}> */}
                            {/* <FormControls.TextField
                                    type='tel'
                                    label='Phone'
                                    name='phone'
                                /> */}
                            {/* <FormControls.TextField
                                             type='tel'
                                             label='Phone'
                                             name='phone'
                                        /> */}
                            {/* </Grid> */}

                            {/* Address */}
                            {/* <Grid item xs={12}>
                                <Typography variant="h6" >Address</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControls.TextField
                                    label='Address Line 1'
                                    name='addressLine1'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControls.TextField
                                    label='Address Line 2'
                                    name='addressLine2'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControls.TextField
                                    label='City'
                                    name='city'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControls.TextField
                                    label='State/Province'
                                    name='state'
                                />

                            </Grid> */}

                            {/* Country Select */}
                            {/* <Grid item xs={12}>
                                <FormControls.Select
                                    label='Country'
                                    name='country'
                                    options={countryOptions}
                                />
                            </Grid> */}

                            {/* Booking */}
                            {/*  <Grid item xs={12}>
                                <Typography variant="h6" >Booking</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControls.DateTimePicker
                                    label='Arrival'
                                    name='arrivalDate'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControls.DateTimePicker
                                    label='Departure'
                                    name='departureDate'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControls.TextField
                                    label='Message'
                                    name='message'
                                    multiline
                                    rows={4}
                                />
                            </Grid> */}

                            {/* Terms of Service */}
                            {/* <Grid item xs={12}>
                                <Checkbox
                                    icon={<Favorite />}
                                    label='Terms of Service'
                                    legend='I agree to the terms and conditions'
                                    name='termsOfService'
                                />
                            </Grid> */}

                            {/* Gender */}
                            {/* <Grid item xs={12}>
                                <FormControls.Radio
                                    legend='Please Select a gender.'
                                    name='gender'
                                    options={genderOptions}
                                />
                            </Grid> */}

                            {/* Vehicles Owned */}
                            {/* {<Grid item xs={12}>
                                <FormControls.CheckboxList
                                    options={vehiclesOptions}
                                    name='vehiclesOwned'
                                    legend='Mark the types of vehicles that you currently own.'
                                />
                            </Grid>} */}
                            {/* Family Members */}
                            {/* <Grid item xs={12} >
                                <FormControls.FieldArray
                                    legend='List your Family Members'
                                    name='familyMembers'
                                    fieldName='Family Member'
                                />
                            </Grid> */}
                            {/* Family Members */}
                            <Grid item xs={12} >
                                <FormControls.FieldArrayNested
                                    legend='List your Phone'
                                    name='phone'
                                    fieldName='Phone'
                                    structure={{
                                        code: '',
                                        number: '',
                                    }}
                                // showHelper
                                // minFields/minItems/min // displays a min no. of text fields with disabled remove button
                                />

                            </Grid>
                            {/* Submit */}
                            <Grid item xs={6} md={4}>
                                <FormControls.Button >
                                    Submit
                                </FormControls.Button>
                            </Grid>



                            {/* <Grid item xs={12}>

                                <FormControl component="fieldset">

                                    <FormLabel component="legend">Legend</FormLabel>

                                    <RadioGroup
                                        aria-label="radiogroup"
                                        name="s"
                                        value={['1', '3']}
                                        onChange={
                                            (evt) => {
                                                console.log(evt)
                                            }}
                                    >

                                        <Grid item xs={12} >

                                            <FormControlLabel
                                                value="1"
                                                label="dsa"
                                                control={
                                                    <Radio />
                                                }
                                            />

                                            <FormControlLabel
                                                value="3"
                                                label="FCL"

                                                labelPlacement="start"
                                                control={<Radio />}
                                            />

                                            <Radio
                                                label='radio-simple'
                                                value='2'
                                            />
                                            <Radio
                                                label='radio-simple'
                                                value='2'
                                            />
                                            <Radio
                                                label='radio-simple'
                                                value='2'
                                            />

                                        </Grid>


                                    </RadioGroup>
                                    <FormHelperText>Helper Text</FormHelperText>



                                </FormControl>



                            </Grid> */}





                        </Grid>
                        <Typography variant="h2" textAlign='center' mt={6} >Form State</Typography>

                        {/* <FormControls.Textarea
                                   label='Description'
                                   name='description'
                              />
                              <FormControls.Select
                                   label='Select a topic'
                                   name='selectOption'
                                   options={selectOptions}
                              /> */}
                        {/* <FormControls.Radio
                              label='Radio topic'
                              name='radioOption'
                              options={radioOptions}
                         />
                         <FormControls.Checkbox
                              label='Checkbox topics'
                              name='checkboxOption'
                              options={checkboxOptions}
                         />
                         <FormControls.FieldList
                              label='Field Array'
                              name='fieldArr'
                              type='number'
                         />
                         <FormControls.FieldListPair
                              label='Field Array Pair'
                              name='fieldArrPair'
                         /> */}
                        {/* <button type='submit' className={styles.formSubmit} >Submit</button> */}
                        <pre >
                            {
                                JSON.stringify(
                                    formik.values, null, 4
                                )
                            }
                        </pre>
                    </FmkForm>
                )
            }}

        </Formik >
    )
}

export default Form;
