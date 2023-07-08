<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <router-link :to="{ name: 'home' }" class="navbar-brand">Luxorbnb</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link :to="{ name: 'home' }" class="nav-link active">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'all-properties' }" class="nav-link">Proprietà</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'about-us' }" class="nav-link">Chi siamo</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'contact-us' }" class="nav-link">Contatti</router-link>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'HeaderComponent',
}
</script>
