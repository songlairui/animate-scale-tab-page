<template>
    <div class="next-page">
        <Tab/>
        <TabContent/>
    </div>
</template>

<script>
export default {
    name: "NextPage",
    data() {
        return {
            tabs: [
                {
                    label: "RE",
                    toast: "2"
                },
                {
                    label: "GENE",
                    toast: "2"
                },
                {
                    label: "RATE",
                    toast: "2"
                },
                {
                    label: "ENAMEL",
                    toast: "99+"
                },
                {
                    label: "SCIENCE",
                    toast: "99+"
                }
            ]
        };
    }
};
</script>

<style lang="less" scoped>
</style>
