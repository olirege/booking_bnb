<template>
    <div class="category-card-skeleton-wrapper">
        <div class="card-image-skeleton-wrapper"></div>
        <div class="card-content-skeleton-wrapper"></div>
    </div>
</template>
<style>
    .category-card-skeleton-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width:64px;
        gap:4px;
    }
    .card-image-skeleton-wrapper{
        height: 30px;
        width: 30px;
        border-radius: 50%;
        animation:pulse-bg 5s infinite;;
    }

    .card-content-skeleton-wrapper{
        height: 1rem;
        width: 100%;
        animation:pulse-bg 5s infinite;
        border-radius: 5px;        
    }

    @keyframes pulse-bg{
        0%{
            background-color: #ccc;
        }
        50%{
            background-color: #eee;
        }
        100%{
            background-color: #ccc;
        }
    }
</style>