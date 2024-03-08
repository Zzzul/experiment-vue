<script setup>
import { useProductStore } from '@/stores/product'
import { watch } from 'vue'
import ls from '@/utils/secure-ls'
import * as yup from 'yup'
import { useForm, Field, ErrorMessage } from 'vee-validate'
import { useRouter } from 'vue-router'  

const router = useRouter()
const productStore = useProductStore()

const schema = yup.object({
    title: yup.string().required().min(6),
})

const { handleSubmit, values, meta } =  useForm({
    validationSchema: schema,
    initialValues: productStore.formProduct,
})

watch(
    values,
    (newValue) => {
        productStore.$patch('formProduct', newValue)
        ls.set('formProduct', JSON.stringify(newValue))

        console.log('changing')
    },
    { deep: true }
)

const onSubmit = handleSubmit(productStore.saveProduct)

const clear = () => {
    productStore.clear()
    router.go()
}
</script>

<template>
    <div class="create-product">
        <h1>Create Product</h1>

        <pre>
            {{ productStore.formProduct }}
        </pre>

        <br>

        <router-link to="/products">Back</router-link>

        <br>

        <form @submit.prevent="onSubmit">
            <div class="field">
                <Field name="title" type="text" placeholder="Email" v-model="values.title" />
                <ErrorMessage name="title" />
            </div>

            <br>
            <br>

            <button type="button" @click="clear">Clear</button>
            <button type="submit" :disabled="!meta.valid">Save</button>
        </form>
    </div>
</template>