<template>
    <div class="index">
        <p>this is index content</p>
        <div class="test">
            <span>test: {{ test }}</span>
            <button @click="testMethod()">change</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                test: true
            };
        },
        methods: {
            testMethod() {
                return this.test = !this.test;
            }
        }
    }
</script>

<style scoped>

</style>