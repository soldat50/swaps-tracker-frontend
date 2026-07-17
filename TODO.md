# TODO

Je n'ai pas bien compris certains point du test technique
- La restriction sur les dates(Start Date > End Date), je suppose que c'est une erreur de frappe et j'ai opté pour (Start Date < End Date)
- Je suis allé sur le principe que la NPV pour tous les swaps du tableau changent en temps réel avec le taux variable calculé pout les 3 secondes
    
Voici des améliorations que je pourrais apporter a l'application car j'ai pas eu assez de temps
1- Améliorer l'architecture pour mettre en place un 'swap-form.helper.ts'
2- Typage form de mon swapForm () export type SwapForm = FormGroup<{
  direction: FormControl<SwapDirectionEnum>;
  ...
} 
2- Ajouter d'avantage des tests unitaire
3- Ajouter un plan detaillé de l'architecture  