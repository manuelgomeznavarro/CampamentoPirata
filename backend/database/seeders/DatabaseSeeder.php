<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // 1. Create Admins (NBA League Officials)
        DB::table('admins')->insert([
            [
                'name' => 'Adam',
                'lastname' => 'Silver',
                'dni' => '12345678A',
                'phone' => '666111222',
                'phone2' => '666333444',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mark',
                'lastname' => 'Tatum',
                'dni' => '87654321B',
                'phone' => '666555666',
                'phone2' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // 2. Create Monitors (NBA Coaches)
        DB::table('monitors')->insert([
            [
                'name' => 'Steve',
                'lastname' => 'Kerr',
                'dni' => '11111111C',
                'phone' => '666777888',
                'phone2' => '666999000',
                'admin_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Erik',
                'lastname' => 'Spoelstra',
                'dni' => '22222222D',
                'phone' => '666444555',
                'phone2' => null,
                'admin_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // 9. Create Tutors (Parents/Guardians)
        DB::table('tutors')->insert([
            [
                'name' => 'Dell',
                'lastname' => 'Curry',
                'dni' => '33333333E',
                'phone' => '666123456',
                'phone2' => null,
                'city' => 'Charlotte',
                'postal_code' => '28202',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Dwyane',
                'lastname' => 'Wade',
                'dni' => '44444444F',
                'phone' => '666654321',
                'phone2' => '666987654',
                'city' => 'Miami',
                'postal_code' => '33131',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // 3. Create Users for Admins and Monitors
        DB::table('users')->insert([
            [
                'email' => 'asilver@nba.com',
                'password' => Hash::make('Password1@'),
                'role' => 'admin',
                'role_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'mtatum@nba.com',
                'password' => Hash::make('Password1@'),
                'role' => 'admin',
                'role_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'skerr@warriors.com',
                'password' => Hash::make('Password1@'),
                'role' => 'monitor',
                'role_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'espoelstra@heat.com',
                'password' => Hash::make('Password1@'),
                'role' => 'monitor',
                'role_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'dcurry@hornets.com',
                'password' => Hash::make('Password1@'),
                'role' => 'tutor',
                'role_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'dwade@heat.com',
                'password' => Hash::make('Password1@'),
                'role' => 'tutor',
                'role_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // 4. Create Activities (Basketball Training Sessions)
        DB::table('activities')->insert([
            [
                'name' => 'Shooting Practice',
                'description' => 'Advanced shooting drills and techniques',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Defense Training',
                'description' => 'Defensive positioning and strategies',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // 5. Create Timelines (Training Schedule)
        DB::table('timelines')->insert([
            [
                'admin_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'admin_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // 6. Create Groups (Training Teams)
        DB::table('groups')->insert([
            [
                'name' => 'Warriors Youth Academy',
                'administrator_id' => 1,
                'monitor_id' => 1,
                'timeline_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Heat Junior Squad',
                'administrator_id' => 2,
                'monitor_id' => 2,
                'timeline_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // 7. Create Activity-Monitor relationships
        DB::table('activity_monitor')->insert([
            [
                'activity_id' => 1,
                'monitor_id' => 1,
            ],
            [
                'activity_id' => 2,
                'monitor_id' => 2,
            ]
        ]);

        // 8. Create Activity-Timeline relationships
        DB::table('activity_timeline')->insert([
            [
                'activity_id' => 1,
                'timeline_id' => 1,
                'duration' => 60,
            ],
            [
                'activity_id' => 2,
                'timeline_id' => 2,
                'duration' => 90,
            ]
        ]);

        

        // 10. Create Children (Young Players)
        DB::table('children')->insert([
            [
                'name' => 'Stephen',
                'lastname' => 'Curry',
                'birthdate' => '2018-01-15',
                't_shirt_size' => 'M',
                'alergy_intolerance' => 'None',
                'aditional_info' => 'Excellent shooter like father',
                'acquaintance' => 'Family legacy',
                'group_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Zaire',
                'lastname' => 'Wade',
                'birthdate' => '2017-06-20',
                't_shirt_size' => 'L',
                'alergy_intolerance' => 'None',
                'aditional_info' => 'Great basketball IQ',
                'acquaintance' => 'NBA Legacy',
                'group_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // 11. Create Inscriptions
        DB::table('inscriptions')->insert([
            [
                'inscription_date' => '2025-06-01',
                'tutor_id' => 1,
                'child_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'inscription_date' => '2025-06-02',
                'tutor_id' => 2,
                'child_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // 12. Create Prices (Training Programs)
        DB::table('prices')->insert([
            [
                'name' => 'Tarifa Pulpo',
                'price' => 299.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tarifa Delfin',
                'price' => 499.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tarifa Tiburón',
                'price' => 900.99,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tarifa Ballena',
                'price' => 2000.99,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // 13. Create Payments
        DB::table('payments')->insert([
            [
                'payment_date' => '2025-06-01',
                'tutor_id' => 1,
                'price_id' => 1,
                'inscription_id' => 1,
                'payment_method' => 'Credit Card',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'payment_date' => '2025-06-02',
                'tutor_id' => 2,
                'price_id' => 2,
                'inscription_id' => 2,
                'payment_method' => 'Bank Transfer',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // 14. Create Incidents
        DB::table('incidents')->insert([
            [
                'subject' => 'Minor Ankle Sprain',
                'description' => 'Injury Report',
                'date' => '2025-07-01',
                'status' => 'Resolved',
                'tutor_id' => 1,
                'admin_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'subject' => 'Training Schedule Adjustment',
                'description' => 'Schedule Change Request',
                'date' => '2025-07-02',
                'status' => 'Pending',
                'tutor_id' => 2,
                'admin_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}