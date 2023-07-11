<template>
    <div class="loading-page">
        <div class="loading-overlay">
            <div class="loading-icon">
                <i class="fa-solid fa-hurricane"></i>
                <!-- <p>Loading...</p> -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5); 
}

.loading-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.3s ease-in-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.loading-icon {
   
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 44px;
    color: white;
}
</style>
