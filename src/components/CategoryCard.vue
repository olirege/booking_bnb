<template>
    <div class="category-card-wrapper">
        <div class="card-image-wrapper">
            <slot name="img" ></slot>
        </div>
        <div class="card-content-wrapper">
            <h1><slot name="title"></slot></h1>
        </div>
    </div>
</template>
<style>
    .category-card-wrapper{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: grey;
        max-width:64px;
        transition: box-shadow 0.2s ease 0s, color 0.2s ease 0s;
    }
    .category-card-wrapper:hover, .category-card-wrapper.active {
        box-shadow:  0 2px 0 0 lightgrey;
        color: black;
    }
    .card-image-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    .card-image-wrapper > *{
        height: 25px;
        width: 25px;
    }
    .card-content-wrapper{
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    .card-content-wrapper >h1{
        font-size: 0.9em;
        font-weight: 700;
    }
</style>