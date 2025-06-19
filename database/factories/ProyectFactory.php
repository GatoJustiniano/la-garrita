<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Proyect>
 */
class ProyectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->firstName(),
            'description' => $this->faker->address(),                        
            'leader_id' => $this->faker->numberBetween(1, 6),            
            'xml' => '<umldiagrams><UMLClassDiagram name="Class diagram" backgroundNodes="#ffffbb"><UMLClass id="0.5398517689663077:UMLClass_1" x="115" y="82" width="113" height="66" backgroundColor="#ffffbb" lineColor="#294253" lineWidth="1" tagValues="" abstract="false"><superitem id="stereotypes" visibleSubComponents="true"/><item id="name" value="Empresa"/><superitem id="attributes" visibleSubComponents="true"><item value="id:int"/><item value="name:string"/></superitem><superitem id="operations" visibleSubComponents="true"/></UMLClass><UMLClass id="0.5398517689663077:UMLClass_0" x="115" y="246" width="113" height="62" backgroundColor="#ffffbb" lineColor="#294253" lineWidth="1" tagValues="" abstract="false"><superitem id="stereotypes" visibleSubComponents="true"/><item id="name" value="Empleado"/><superitem id="attributes" visibleSubComponents="true"><item value="int:int"/><item value="name:string"/></superitem><superitem id="operations" visibleSubComponents="true"/></UMLClass><UMLAssociation id="0.5398517689663077:UMLAssociation_0" side_A="0.5398517689663077:UMLClass_1" side_B="0.5398517689663077:UMLClass_0"><point x="171.5" y="148"/><point x="171.5" y="246"/><superitem id="stereotype" visibleSubComponents="true"/><item id="name" value="contrata"/><item id="roleA" value="1"/><item id="roleB" value="n"/><item id="multiplicityA" value=""/><item id="multiplicityB" value=""/></UMLAssociation></UMLClassDiagram></umldiagrams>',
        ];
    }
}
