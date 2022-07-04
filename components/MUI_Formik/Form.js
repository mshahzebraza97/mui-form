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
        fullName: '',
        age: 0,
        email: '',
        phone: '',
        country: '',
        message: '',

        arrivalDate: '',
        departureDate: '',

        termsOfService: false,
        vehiclesOwned: [],
        gender: '',

        familyMembers: [],
        phoneNumbers: [],
        ...defaultValues,

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


        fullName: Yup.string()
            .required('Required'),
        age: Yup.number()
            .typeError('Age must be a number')
            .required('Required')
            .min(18, 'Must be 18 or older')
        ,
        email: Yup.string()
            .email('Invalid Email')
            .required('Required'),
        phone: Yup.number()
            .integer()
            .typeError('Please Enter a valid Phone Number')
            .required('Required'),
        country: Yup.string()
            .typeError('Choose a Valid Country')
            .required('Required'),
        message: Yup.string().required('Required'),
        arrivalDate: Yup.date()
            .required('Required'),
        departureDate: Yup.date()
            .required('Required'),
        termsOfService: Yup.boolean()
            .oneOf([true], 'The terms and conditions must be accepted.')
            .required('The terms and conditions must be accepted.'),
        vehiclesOwned: Yup
            .array()
            .min(1, 'Select at-least 01 option')
            .max(2, 'Select 02 options at max')
            .required('You must have at-least one mode of conveyance.'),
        gender: Yup.string()
            .oneOf(Object.keys(genderOptions), 'Value is invalid')
            .required('Required'),
        familyMembers: Yup.array()
            // .min(2, 'Must have at least 2 items') // !FIXME: These won't work properly
            // .max(2, 'Select 02 options at max')
            .of( //TODO: How to limit the options to 'n' items with a proper error message?
                Yup.string()
                    .required('Cannot be empty')
            ),
        phoneNumbers: Yup.array()
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

        // ? check if the following is possible
        // phone: Yup.object().shape({
        //      code: Yup.string().required('Required'),
        //      number: Yup.string().required('Required'),
        // }),

    })

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

                            {/* Name */}
                            <Grid item xs={12}>
                                <Typography variant="h6" >Text Fields</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControls.TextField
                                    label='Full Name'
                                    name='fullName'
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <FormControls.TextField
                                    label='Age'
                                    name='age'
                                />
                            </Grid>


                            <Grid item xs={6}>
                                <FormControls.TextField
                                    type='email'
                                    label='Email'
                                    name='email'
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControls.TextField
                                    type='tel'
                                    label='Phone'
                                    name='phone'
                                />
                            </Grid>

                            {/* Country Select */}
                            <Grid item xs={12}>
                                <FormControls.Select
                                    label='Country'
                                    name='country'
                                    options={countryOptions}
                                />
                            </Grid>

                            {/* Message */}
                            <Grid item xs={12}>
                                <FormControls.TextField
                                    label='Message'
                                    name='message'
                                    multiline
                                    rows={4}
                                />
                            </Grid>
                            {/* Booking */}
                            <Grid item xs={12}>
                                <Typography variant="h6" >Date/Time</Typography>
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
                                <Typography variant="h6" >Checkboxes/Radios</Typography>
                            </Grid>


                            {/* Terms of Service */}
                            <Grid item xs={12}>
                                <FormControls.Checkbox
                                    // icon={<Favorite />}
                                    label='Terms of Service'
                                    legend='I agree to the terms and conditions'
                                    name='termsOfService'
                                />
                            </Grid>
                            {/* Vehicles Owned */}
                            <Grid item xs={12}>
                                <FormControls.CheckboxList
                                    row
                                    options={vehiclesOptions}
                                    name='vehiclesOwned'
                                    legend='Mark the types of vehicles that you currently own.'
                                />
                            </Grid>
                            {/* Gender */}
                            <Grid item xs={12}>
                                <FormControls.Radio
                                    row
                                    legend='Please Select a gender.'
                                    name='gender'
                                    options={genderOptions}
                                />
                            </Grid>


                            {/* Complex Fields */}
                            <Grid item xs={12}>
                                <Typography variant="h6" >Complex Fields</Typography>
                            </Grid>


                            {/* Family Members */}
                            <Grid item xs={12} >
                                <FormControls.FieldArray
                                    legend='List your Family Members'
                                    name='familyMembers'
                                    fieldName='Family Member'
                                />
                            </Grid>
                            {/* Family Members */}
                            <Grid item xs={12} >
                                <FormControls.FieldArrayNested
                                    legend='List your Phone Number'
                                    name='phoneNumbers'
                                    fieldName='Phone Number'
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
