<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useToast } from 'primevue/usetoast';
import CustomerService from '@/service/CustomerService';

const toast = useToast();

const customers = ref(null);
const customer = ref({});
const submitted = ref(false);

const customerService = new CustomerService();

onMounted(() => {
    customerService.getCustomersList().then((data) => (customers.value = data));
});

const saveCustomer = () => {
    submitted.value = true;
    if (customer.value.companyName && customer.value.companyName.trim() && customer.value.contactNo) {

        customer.value.id = createId();
        customers.value.push(customer.value);
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        customer.value = {};
    }
};

const createId = () => {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Add Customer</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                        <label for="companyName">Company Name</label>
                        <InputText id="companyName" type="text" name="companyName" v-model.trim="customer.companyName" required="true" autofocus :class="{ 'p-invalid': submitted && !customer.companyName }" />
                        <small class="p-invalid" v-if="submitted && !customer.companyName">Company Name is required.</small>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="keyPerson">Key Person</label>
                        <InputText id="keyPerson" type="text" name="keyPerson" v-model.trim="customer.keyPerson" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="contactNo">Contact No.</label>
                        <InputText id="contactNo" type="tel" name="contactNo" v-model.trim="customer.contactNo" required="true" :class="{ 'p-invalid': submitted && !customer.contactNo }" />
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
                        <InputText id="productType" type="text" name="productType" v-model.trim="customer.productType"/>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="purchasePlan">M/C Purchase Plan</label>
                        <InputText id="purchasePlan" type="text" name="purchasePlan" v-model.trim="customer.purchasePlan" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="suggestedModel">Suggested Model</label>
                        <InputText id="suggestedModel" type="text" name="suggestedModel" v-model.trim="customer.suggestedModel" />
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
                        <Button  label="Reset" class="p-button-secondary mr-2 mb-2" />
                    </div>
                    <div class="field col-12 md:col-2">
                        <Button label="Submit" class="mr-2 mb-2" @click="saveCustomer" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
