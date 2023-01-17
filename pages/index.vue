<template>
  <v-container fluid>
    <v-breadcrumbs :items="['Foo', 'Bar', 'Fizz']"></v-breadcrumbs>
    <div class="ml-4 text-h4 text-indigo">Services</div>
    <v-row class="mt-5">
      <v-col v-for="n in 6" :key="n" cols="12" sm="4">
        <v-card class="mx-1" elevation="9">
          <v-card-text class="centered"><v-icon>mdi-home</v-icon></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
