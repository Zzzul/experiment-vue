<template>
    <div :class="{ 'drawer': true, 'border-right-green-500': true, 'lg:drawer-open': drawerOpen }">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <!-- Page content here -->
            <label for="my-drawer" class="btn btn-primary drawer-button" @click="toggleDrawer">
                {{ drawerOpen ? 'Close drawer' : 'Open drawer' }}
            </label>
        </div>
        <div class="drawer-side">
            <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <div class="p-4">
                <div class="flex items-center mb-4">
                    <img src="https://placehold.co/600x400" alt="Avatar" class="w-10 h-10 rounded-full mr-2">
                    <span>John Doe</span>
                </div>
                <ul class="menu">
                    <li class="menu-title">Main Menu</li>
                    <li><a>Dashboard</a></li>
                    <li><a>Products</a></li>
                    <li><a>Orders</a></li>
                    <li><a>Users</a></li>
                    <li class="menu-title">Settings</li>
                    <li><a>Profile</a></li>
                    <li><a>Preferences</a></li>
                    <li><a>Security</a></li>
                    <li class="menu-title">Logout</li>
                    <li><a @click="logout">Logout</a></li>
                    <!-- Submenu with dropdown -->
                    <li class="menu-title">Dropdown Menu</li>
                    <li class="dropdown" @click="toggleDropdown">
                        <a>Dropdown</a>
                        <ul v-if="showDropdown" class="shadow menu dropdown-content bg-base-100 rounded-box w-52">
                            <li><a>Submenu Item 1</a></li>
                            <li><a>Submenu Item 2</a></li>
                            <li><a>Submenu Item 3</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            drawerOpen: false,
            showDropdown: false
        };
    },
    methods: {
        toggleDrawer() {
            this.drawerOpen = !this.drawerOpen;
        },
        logout() {
            // Implement logout functionality here
            console.log('Logout clicked');
        },
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        }
    }
}
</script>

<style scoped>
/* Tambahkan style CSS sesuai kebutuhan */
</style>