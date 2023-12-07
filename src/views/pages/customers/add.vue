<script setup>
import { ref } from 'vue';
import { useToast } from "primevue/usetoast";
const toast = useToast();

const customer = ref({
    companyName: '',
    keyPerson: '',
    contactNo: '',
    email: '',
    address: '',
    customerType: '',
    productType: '',
    purchasePlan: '',
    suggestedModel: '',
    date: null,
    reference: ''
});

const submitted = ref(false);

const validateForm = () => {
    return (
        customer.value.companyName &&
        customer.value.keyPerson &&
        customer.value.contactNo &&
        customer.value.email &&
        customer.value.address &&
        customer.value.customerType &&
        customer.value.productType &&
        customer.value.purchasePlan &&
        customer.value.suggestedModel &&
        customer.value.date &&
        customer.value.reference
    );
};


const saveCustomer = async () => {
    try {
        // Assuming you have the necessary data for creating a customer in a variable named 'customerData'
        if (validateForm()) {
            await axiosIns.post('/customers', customer);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Customer Created', life: 3000 });
        } else {
            // Handle the case when the form is not valid
            toast.add({ severity: 'error', summary: 'Error', detail: 'Invalid form data', life: 3000 });
        }
    } catch (error) {
        console.error('Error creating customer:', error);
    }
};



</script>

<template>
    <Toast />

    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Add Customer</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                        <label for="companyName">Company Name</label>
                        <InputText id="companyName" type="text" name="companyName" v-model.trim="customer.companyName"
                            required="true" autofocus :class="{ 'p-invalid': submitted && !customer.companyName }" />
                        <small class="p-invalid" v-if="submitted && !customer.companyName">Company Name is required.</small>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="keyPerson">Key Person</label>
                        <InputText id="keyPerson" type="text" name="keyPerson" v-model.trim="customer.keyPerson" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="contactNo">Contact No.</label>
                        <InputText id="contactNo" type="tel" name="contactNo" v-model.trim="customer.contactNo"
                            required="true" :class="{ 'p-invalid': submitted && !customer.contactNo }" />
                        <small class="p-invalid" v-if="submitted && !customer.contactNo">Company Name is required.</small>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="email">Email</label>
                        <InputText id="email" type="email" name="email" v-model.trim="customer.email" />
                    </div>
                    <div class="field col-12">
                        <label for="address">Address</label>
                        <Textarea id="address" name="address" rows="4" v-model.trim="customer.address" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="customerType">Customer type</label>
                        <InputText id="customerType" type="text" name="customerType" v-model.trim="customer.customerType" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="productType">Product type</label>
                        <InputText id="productType" type="text" name="productType" v-model.trim="customer.productType" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="purchasePlan">M/C Purchase Plan</label>
                        <InputText id="purchasePlan" type="text" name="purchasePlan" v-model.trim="customer.purchasePlan" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="suggestedModel">Suggested Model</label>
                        <InputText id="suggestedModel" type="text" name="suggestedModel"
                            v-model.trim="customer.suggestedModel" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="date">Date</label>
                        <InputText id="date" type="date" name="date" v-model.trim="customer.date" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="reference">Reference</label>
                        <InputText id="reference" type="text" name="reference" v-model.trim="customer.reference" />
                    </div>
                    <div class="field col-12 md:col-6"></div>
                    <div class="field col-12 md:col-2"></div>
                    <div class="field col-12 md:col-2">
                        <Button label="Reset" class="p-button-secondary mr-2 mb-2" />
                    </div>
                    <div class="field col-12 md:col-2">
                        <Button label="Submit" class="mr-2 mb-2" @click="saveCustomer" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
