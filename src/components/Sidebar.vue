<template>
    <v-card>
        <v-layout>
            <!-- Tombol untuk membuka/tutup sidebar -->
            <v-btn @click="toggleSidebar" class="d-lg-none" fab dark color="primary">
                <v-icon v-if="!drawer">mdi-menu</v-icon>
                <v-icon v-else>mdi-close</v-icon>
            </v-btn>

            <!-- Sidebar -->
            <v-navigation-drawer v-model="drawer" permanent location="left">
                <template v-slot:prepend>
                    <v-list-item lines="two" prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
                        title="Jane Smith" subtitle="Logged in"></v-list-item>
                </template>

                <v-divider></v-divider>

                <v-list density="compact" nav>
                    <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
                    <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
                    <v-list-item prepend-icon="mdi-store" title="Products" value="products"></v-list-item>
                    <v-list-item prepend-icon="mdi-cart" title="Orders" value="orders"></v-list-item>
                    <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-main style="height: 1200px"></v-main>
        </v-layout>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            drawer: true, // Inisialisasi sidebar terbuka
        };
    },
    methods: {
        // Fungsi untuk mengubah status sidebar (terbuka/tutup)
        toggleSidebar() {
            this.drawer = !this.drawer;
        },
    },
};
</script>