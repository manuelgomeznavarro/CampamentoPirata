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
        // 1. Create Admins
        DB::table('admins')->insert([
            [
                'name' => 'Santiago',
                'lastname' => 'Aldama',
                'dni' => '12345678A',
                'phone' => '666111222',
                'phone2' => '666333444',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Anton',
                'lastname' => 'Álvarez',
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
                'name' => 'Isabel',
                'lastname' => 'Martínez',
                'dni' => '11111111C',
                'phone' => '666777888',
                'phone2' => '666999000',
                'description' => 'Apasionada por la educación y el desarrollo infantil. En mi tiempo libre, disfruto de la lectura y la fotografía.',
                'admin_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mei',
                'lastname' => 'Li',
                'dni' => '22222222D',
                'phone' => '666444555',
                'phone2' => null,
                'description' => 'Soy una monitora paciente y divertida, me gusta apoyar a los niños en su proceso de aprendizaje. Me encanta enseñar a los niños la cultura de mi país.',
                'admin_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Oliver',
                'lastname' => 'Giroud',
                'dni' => '12345432E',
                'phone' => '974359975',
                'phone2' => null,
                'description' => 'Apasionado del deporte y las actividades en grupo. Me encanta ayudar a los niños a desarrollar habilidades de trabajo en equipo. Me encanta el fútbol y el senderismo.',
                'admin_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Lola',
                'lastname' => 'Lolita',
                'dni' => '54321432M',
                'phone' => '905687123',
                'phone2' => null,
                'description' => 'Me considero una persona muy dinámica, enfocada en fomentar la autonomía y creatividad en los niños. Me gusta bailar flamenco y practico yoga.',
                'admin_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Josh',
                'lastname' => 'Matuidi',
                'dni' => '33366699L',
                'phone' => '905687245',
                'phone2' => null,
                'description' => 'Soy muy creativo y disfruto de actividades artísticas como la pintura. Soy un gran defensor del aprendizaje autónomo y busco inspirar a los más pequeños con mi creatividad.',
                'admin_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // 9. Create Tutors (Parents/Guardians)
        DB::table('tutors')->insert([
            [
                'name' => 'Julio',
                'lastname' => 'González',
                'dni' => '33333333E',
                'phone' => '666123456',
                'phone2' => null,
                'city' => 'Marbella',
                'postal_code' => '29600',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Antonio',
                'lastname' => 'Marín',
                'dni' => '44444444F',
                'phone' => '666654321',
                'phone2' => '666987654',
                'city' => 'Phoenix',
                'postal_code' => '85001',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Rocio',
                'lastname' => 'López',
                'dni' => '66699933F',
                'phone' => '923636542',
                'phone2' => null,
                'city' => 'Vilanova de Sau',
                'postal_code' => '08519',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Julia',
                'lastname' => 'Jiménez',
                'dni' => '78451239H',
                'phone' => '182357456',
                'phone2' => null,
                'city' => 'Los Angeles',
                'postal_code' => '90001',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Alexia',
                'lastname' => 'Martínez',
                'dni' => '89452316S',
                'phone' => '987147741',
                'phone2' => '123321333',
                'city' => 'Barcelona',
                'postal_code' => '08001',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // 3. Create Users for Admins and Monitors
        DB::table('users')->insert([
            [
                'email' => 'saldama@tesoroperdido.com',
                'password' => Hash::make('Password1@'),
                'role' => 'admin',
                'url_pic' => "https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/user_images/1/santiago_aldama.png",
                'role_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'aalvarez@tesoroperdido.com',
                'password' => Hash::make('Password1@'),
                'role' => 'admin',
                'url_pic' => "https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/user_images/2/anton_alvarez_p.jpg",
                'role_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'imartinez@tesoroperdido.com',
                'password' => Hash::make('Password1@'),
                'role' => 'monitor',
                'role_id' => 1,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/user_images/3/isabel_martinez.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'mlei@tesoroperdido.com',
                'password' => Hash::make('Password1@'),
                'role' => 'monitor',
                'role_id' => 2,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/user_images/4/mei_li.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'ogiroud@tesoroperdido.com',
                'password' => Hash::make('Password1@'),
                'role' => 'monitor',
                'role_id' => 3,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/user_images/5/oliver_giroud.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'llolita@tesoroperdido.com',
                'password' => Hash::make('Password1@'),
                'role' => 'monitor',
                'role_id' => 4,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/user_images/6/lola_lolita.webp',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'jmatuidi@tesoroperdido.com',
                'password' => Hash::make('Password1@'),
                'role' => 'monitor',
                'role_id' => 5,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/user_images/7/josh_kimpembe.jpg   ',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'jgonzalez@gmail.com',
                'password' => Hash::make('Password1@'),
                'role' => 'tutor',
                'role_id' => 1,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/user_images/8/julio_gonzalez.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'amarin@gmail.com',
                'password' => Hash::make('Password1@'),
                'role' => 'tutor',
                'role_id' => 2,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/user_images/9/antonio_marin.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'rlopez@gmail.com',
                'password' => Hash::make('Password1@'),
                'role' => 'tutor',
                'role_id' => 3,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/user_images/10/rocio_lopez.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'jjimenez@gmail.com',
                'password' => Hash::make('Password1@'),
                'role' => 'tutor',
                'role_id' => 4,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/user_images/11/julia_jimenez.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'email' => 'amartinez@gmail.com',
                'password' => Hash::make('Password1@'),
                'role' => 'tutor',
                'role_id' => 5,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/user_images/12/alexia_martinez.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // 4. Create Activities (Basketball Training Sessions)
        DB::table('activities')->insert([
            [
                'name' => 'Gincana',
                'description' => 'Gincana de habilidades',
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/activities/foto_gincana.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Meditación inmersiva',
                'description' => 'Meditación en grupo',
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/activities/foto_meditacion.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Creación de barco pirata',
                'description' => 'Taller inmersivo de creación de barcos piratas',
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/activities/foto_creacion_barco.jpeg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Creación de pirata y grupos piratas',
                'description' => 'Taller de iniciación de creación de piratas',
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/activities/foto_taller_piratas.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Esgrima',
                'description' => 'Instrucción práctica sobre esgrima infantil',
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/activities/foto_esgrima.jpg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Guerra de agua',
                'description' => 'Pelea acuática',
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/activities/foto_juegos_agua.webp',
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
                'admin_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'admin_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'admin_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'admin_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // 6. Create Groups (Training Teams)
        DB::table('groups')->insert([
            [
                'name' => 'Pequeños Cartógrafos de Historias',
                'administrator_id' => 1,
                'monitor_id' => 1,
                'timeline_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Dragones del Junco Dorado',
                'administrator_id' => 1,
                'monitor_id' => 2,
                'timeline_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tripulación de los Jóvenes Corsarios',
                'administrator_id' => 1,
                'monitor_id' => 3,
                'timeline_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Galeón del Baile Rebelde',
                'administrator_id' => 1,
                'monitor_id' => 4,
                'timeline_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bandera de los Pintores Audaces',
                'administrator_id' => 1,
                'monitor_id' => 5,
                'timeline_id' => 5,
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
                'date' => '2025-02-18',
                'hour' => '11:00:00',
                'duration' => 60,
            ],
            [
                'activity_id' => 2,
                'timeline_id' => 2,
                'date' => '2025-02-18',
                'hour' => '11:00:00',
                'duration' => 90,
            ],
            [
                'activity_id' => 3,
                'timeline_id' => 2,
                'date' => '2025-03-04',
                'hour' => '08:00:00',
                'duration' => 360,
            ],
        ]);

        

        // 10. Create Children (Young Players)
        DB::table('children')->insert([
            [
                'name' => 'Alejandro',
                'lastname' => 'González',
                'birthdate' => '2018-01-15',
                't_shirt_size' => '6-7',
                'alergy_intolerance' => 'Polen',
                'aditional_info' => 'Gran talento para la música y el canto',
                'acquaintance' => null,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/children_images/1/alejandro_gonzalez.jpg',
                'group_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Guillermo',
                'lastname' => 'González',
                'birthdate' => '2017-06-20',
                't_shirt_size' => '8-9',
                'alergy_intolerance' => 'Lactosa', 
                'aditional_info' => 'Experto en videojuegos y tecnología', 
                'acquaintance' => null, 
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/children_images/2/guillermo_gonzalez.jpg',
                'group_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pedro',
                'lastname' => 'Marín',
                'birthdate' => '2017-06-23',
                't_shirt_size' => '10-11',
                'alergy_intolerance' => 'Gluten',
                'aditional_info' => null,
                'acquaintance' => null,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/children_images/3/pedro_marin.jpg',
                'group_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Angelina',
                'lastname' => 'Marín',
                'birthdate' => '2017-03-23',
                't_shirt_size' => '8-9',
                'alergy_intolerance' => 'None',
                'aditional_info' => '',
                'acquaintance' => null,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/children_images/4/angelina_marin.jpg',
                'group_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Amador',
                'lastname' => 'López',
                'birthdate' => '2017-01-23',
                't_shirt_size' => '10-11',
                'alergy_intolerance' => 'Picadura de insectos',
                'aditional_info' => null,
                'acquaintance' => null,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/children_images/5/amador_lopez.jpg',
                'group_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Marta',
                'lastname' => 'López',
                'birthdate' => '2017-08-23',
                't_shirt_size' => '4-5',
                'alergy_intolerance' => 'Frutos secos',
                'aditional_info' => null,
                'acquaintance' => null,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/children_images/6/marta_lopez.jpg',
                'group_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Melodía',
                'lastname' => 'Jimenez',
                'birthdate' => '2017-11-23',
                't_shirt_size' => '6-7',
                'alergy_intolerance' => 'Lactosa',
                'aditional_info' => null,
                'acquaintance' => null,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/children_images/7/melodia_jimenez.jpg',
                'group_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Manuel',
                'lastname' => 'Jimenez”',
                'birthdate' => '2018-01-01',
                't_shirt_size' => '10-11',
                'alergy_intolerance' => null,
                'aditional_info' => '',
                'acquaintance' => null,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/children_images/8/manuel_jimenez.jpg',
                'group_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Paulina',
                'lastname' => 'Martínez',
                'birthdate' => '2018-02-01',
                't_shirt_size' => '6-7',
                'alergy_intolerance' => null,
                'aditional_info' => '',
                'acquaintance' => null,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/children_images/9/paulina_martinez.jpg',
                'group_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Marta',
                'lastname' => 'Martínez',
                'birthdate' => '2018-03-01',
                't_shirt_size' => '10-11',
                'alergy_intolerance' => null,
                'aditional_info' => '',
                'acquaintance' => null,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/children_images/10/marta_martinez.jpg',
                'group_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Josemi',
                'lastname' => 'Cuesta',
                'birthdate' => '2018-05-01',
                't_shirt_size' => '10-11',
                'alergy_intolerance' => null,
                'aditional_info' => '',
                'acquaintance' => null,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/children_images/11/eduardo-garcia-josemi.webp',
                'group_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Benito',
                'lastname' => 'Martínez',
                'birthdate' => '2018-06-01',
                't_shirt_size' => '6-7',
                'alergy_intolerance' => null,
                'aditional_info' => '',
                'acquaintance' => null,
                'url_pic' => 'https://campamento-tesoro-perdido-image-hosting.fra1.cdn.digitaloceanspaces.com/campamento-tesoro-perdido-image-hosting/children_images/12/bad_bunny.jpg',
                'group_id' => null,
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
                'inscription_date' => '2025-06-01',
                'tutor_id' => 1,
                'child_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'inscription_date' => '2025-06-02',
                'tutor_id' => 2,
                'child_id' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'inscription_date' => '2025-06-02',
                'tutor_id' => 2,
                'child_id' => 4,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'inscription_date' => '2025-06-03',
                'tutor_id' => 3,
                'child_id' => 5,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'inscription_date' => '2025-06-03',
                'tutor_id' => 3,
                'child_id' => 6,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'inscription_date' => '2025-06-04',
                'tutor_id' => 4,
                'child_id' => 7,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'inscription_date' => '2025-06-04',
                'tutor_id' => 4,
                'child_id' => 8,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'inscription_date' => '2025-06-05',
                'tutor_id' => 5,
                'child_id' => 9,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'inscription_date' => '2025-06-05',
                'tutor_id' => 5,
                'child_id' => 10,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'inscription_date' => '2025-06-01',
                'tutor_id' => 1,
                'child_id' => 11,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'inscription_date' => '2025-06-01',
                'tutor_id' => 1,
                'child_id' => 12,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // 12. Create Prices (Training Programs)
        DB::table('prices')->insert([
            [
                'name' => 'Grumete Novato',
                'price' => 24,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Corsario Madrugador',
                'price' => 39,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bucanero Semanal',
                'price' => 185,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Capitán del Barco',
                'price' => 700,
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
                'subject' => 'Mi hijo ha vuelto con picaduras en los brazos',
                'description' => 'Hoy, al recoger a mi hijo del campamento, noté que tenía varias picaduras en los brazos y se quejaba de picor. Me comentó que pasó tiempo jugando cerca de una zona con mucha vegetación. Me gustaría saber si se puede revisar esa área y si están aplicando repelente de insectos a los niños para evitar más casos.',
                'date' => '2025-07-01',
                'status' => 'Resolved',
                'admin_response' => 'Vamos a abrirle un expediente al monitor. Lo sentimos mucho.',
                'tutor_id' => 1,
                'admin_id' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'subject' => 'Pérdida de una chaqueta en el campamento',
                'description' => 'Mi hija perdió su chaqueta azul durante el día de hoy en el campamento. Dice que la dejó en el comedor antes de ir a las actividades, pero al volver ya no estaba. ¿Podrían revisar si la han encontrado o si alguien la recogió por error? Agradecería cualquier información.',
                'date' => '2025-07-02',
                'status' => 'Pending',
                'admin_response' => null,
                'tutor_id' => 2,
                'admin_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // 14. Create Incidents
        DB::table('attendances')->insert([
            [
                'child_id' => 1,
                'timeline_id' => 1,
                'date' => '2025-01-01',
                'attendance' => 1,
                'comments' => 'Ha estado muy participativo hoy, especialmente en las actividades al aire libre. Se nota que disfruta mucho jugando en grupo.'
            ],
            [
                'child_id' => 1,
                'timeline_id' => 1,
                'date' => '2025-01-02',
                'attendance' => 1,
                'comments' => 'Ha mostrado mucho interés en la actividad de manualidades, ha creado una obra muy original y se ha esforzado bastante.'
            ],
            [
                'child_id' => 1,
                'timeline_id' => 1,
                'date' => '2025-01-30',
                'attendance' => 1,
                'comments' => 'Ha tenido un poco de dificultad para integrarse en el grupo, pero con apoyo ha logrado participar en la dinámica.'
            ],
            [
                'child_id' => 1,
                'timeline_id' => 1,
                'date' => '2025-01-29',
                'attendance' => 1,
                'comments' => 'Ha demostrado un gran espíritu de equipo durante el juego de orientación. Ayudó a sus compañeros y mostró liderazgo en varias ocasiones.'
            ],
            [
                'child_id' => 1,
                'timeline_id' => 1,
                'date' => '2025-01-28',
                'attendance' => 1,
                'comments' => 'Ha comido bien en el almuerzo, aunque ha mencionado que no le gustan las verduras. Se le animó a probar un poco y lo hizo.'
            ],
            [
                'child_id' => 1,
                'timeline_id' => 1,
                'date' => '2025-01-27',
                'attendance' => 1,
                'comments' => 'Hoy no quiso comer demasiado en la merienda, pero bebió suficiente agua y se mostró activo durante las actividades.'
            ],
            [
                'child_id' => 1,
                'timeline_id' => 1,
                'date' => '2025-01-26',
                'attendance' => 1,
                'comments' => 'Tuvo un buen descanso en la siesta y se despertó con energía para seguir con las actividades de la tarde.'
            ],
            [
                'child_id' => 1,
                'timeline_id' => 1,
                'date' => '2025-01-10',
                'attendance' => 1,
                'comments' => 'Se cayó mientras corría, pero solo fue un raspón leve en la rodilla. Se le limpió y puso una tirita, siguió jugando sin problema.'
            ],
            [
                'child_id' => 1,
                'timeline_id' => 1,
                'date' => '2025-01-11',
                'attendance' => 1,
                'comments' => 'Hoy estuvo un poco más sensible de lo habitual, echó de menos a su familia, pero con apoyo y distracciones logró disfrutar del día.'
            ],
            [
                'child_id' => 1,
                'timeline_id' => 1,
                'date' => '2025-01-12',
                'attendance' => 1,
                'comments' => 'Ha mencionado que le duele un poco la garganta. Se le ofreció agua y se monitoreará su estado.'
            ]
        ]);
    }
}