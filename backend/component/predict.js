// Function to predict the class and probabilities for a given instance
function predict(instance, classPriors, conditionalProbabilities) {
    let maxProbability = -1;
    let predictedClass = null;
    let strokeProbability = 0;
    let notStrokeProbability = 0;

    Object.keys(classPriors).forEach((className) => {
        let probability = classPriors[className];
        
        Object.keys(instance).forEach((feature) => {
            if (
                conditionalProbabilities[feature] &&
                conditionalProbabilities[feature][instance[feature]] &&
                conditionalProbabilities[feature][instance[feature]][className]
            ) {
                probability *= conditionalProbabilities[feature][instance[feature]][className];
                // let percentile = (probability * 100); 
                // console.log(percentile);
            }
        });

        if (probability > maxProbability) {
            maxProbability = probability;
            predictedClass = className;
        }

        // Assign probabilities to strokeProbability and notStrokeProbability
        if (className === "1") {
            strokeProbability = probability;
        } else {
            notStrokeProbability = probability;
        }
    });

    const totalProbability = strokeProbability + notStrokeProbability;
    strokeProbability = (strokeProbability / totalProbability) * 100;
    notStrokeProbability = (notStrokeProbability / totalProbability) * 100;

    return { predictedClass, strokeProbability, notStrokeProbability };
}

export { predict };
