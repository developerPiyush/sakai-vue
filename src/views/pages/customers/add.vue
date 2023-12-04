<script setup>
import { ref } from 'vue';

const dropdownItems = ref([
    { name: 'Option 1', code: 'Option 1' },
    { name: 'Option 2', code: 'Option 2' },
    { name: 'Option 3', code: 'Option 3' }
]);

const dropdownItem = ref(null);
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Add Customer</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                        <label for="companyName">Company Name</label>
                        <InputText id="companyName" type="text" name="companyName" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="keyPerson">Key Person</label>
                        <InputText id="keyPerson" type="text" name="keyPerson" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="contactNo">Contact No.</label>
                        <InputText id="contactNo" type="tel" name="contactNo" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="email">Email</label>
                        <InputText id="email" type="email" name="email" />
                    </div>
                    <div class="field col-12">
                        <label for="address">Address</label>
                        <Textarea id="address" name="address" rows="4" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="customerType">Customer type</label>
                        <InputText id="customerType" type="text" name="customerType" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="productType">Product type</label>
                        <InputText id="productType" type="text" name="productType" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="purchasePlan">M/C Purchase Plan</label>
                        <InputText id="purchasePlan" type="text" name="purchasePlan" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="suggestedModel">Suggested Model</label>
                        <InputText id="suggestedModel" type="text" name="suggestedModel" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="date">Date</label>
                        <InputText id="date" type="date" name="date" />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="reference">Reference</label>
                        <InputText id="reference" type="text" name="reference" />
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
