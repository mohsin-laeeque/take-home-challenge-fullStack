<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DefaultUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'mohsin@test.com'],
            [
                'name' => 'Mohsin',
                'email' => 'mohsin@test.com',
                'password' => Hash::make('mohsin123'),
            ]
        );
    }
}
