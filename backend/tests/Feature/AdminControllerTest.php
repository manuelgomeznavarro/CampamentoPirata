<?php

namespace Tests\Feature;

use App\Models\Admin;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_get_all_admins()
    {
        Admin::factory()->count(3)->create();

        $response = $this->getJson('/api/admins');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_create_admin()
    {
        $adminData = [
            'name' => 'John',
            'lastname' => 'Doe',
            'dni' => '12345678',
            'phone' => '123456789',
            'phone2' => '987654321',
            'email' => 'john@example.com',
            'password' => 'password'
        ];

        $response = $this->postJson('/api/admins', $adminData);

        $response->assertStatus(201)
            ->assertJsonFragment(['name' => 'John']);

        $this->assertDatabaseHas('admins', ['dni' => '12345678']);
        $this->assertDatabaseHas('users', ['email' => 'john@example.com']);
    }
}