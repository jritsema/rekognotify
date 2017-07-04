const assert = require('assert');
const labelsMatch = require('../.');

const labels = JSON.parse(`
{
  "Labels": [
    {
      "Confidence": 99.25341796875,
      "Name": "Skateboard"
    },
    {
      "Confidence": 99.25341796875,
      "Name": "Sport"
    },
    {
      "Confidence": 99.24723052978516,
      "Name": "People"
    },
    {
      "Confidence": 99.24723052978516,
      "Name": "Person"
    },
    {
      "Confidence": 99.23908233642578,
      "Name": "Human"
    },
    {
      "Confidence": 97.42487335205078,
      "Name": "Parking"
    },
    {
      "Confidence": 97.42487335205078,
      "Name": "Parking Lot"
    },
    {
      "Confidence": 91.53312683105469,
      "Name": "Automobile"
    },
    {
      "Confidence": 91.53312683105469,
      "Name": "Car"
    },
    {
      "Confidence": 91.53312683105469,
      "Name": "Vehicle"
    },
    {
      "Confidence": 76.8509521484375,
      "Name": "Intersection"
    },
    {
      "Confidence": 76.8509521484375,
      "Name": "Road"
    },
    {
      "Confidence": 76.2149429321289,
      "Name": "Boardwalk"
    },
    {
      "Confidence": 76.2149429321289,
      "Name": "Path"
    },
    {
      "Confidence": 76.2149429321289,
      "Name": "Pavement"
    },
    {
      "Confidence": 76.2149429321289,
      "Name": "Sidewalk"
    },
    {
      "Confidence": 76.2149429321289,
      "Name": "Walkway"
    },
    {
      "Confidence": 66.71541595458984,
      "Name": "Building"
    },
    {
      "Confidence": 62.047218322753906,
      "Name": "Coupe"
    },
    {
      "Confidence": 62.047218322753906,
      "Name": "Sports Car"
    },
    {
      "Confidence": 61.988914489746094,
      "Name": "City"
    },
    {
      "Confidence": 61.988914489746094,
      "Name": "Downtown"
    },
    {
      "Confidence": 61.988914489746094,
      "Name": "Urban"
    },
    {
      "Confidence": 60.97810745239258,
      "Name": "Neighborhood"
    },
    {
      "Confidence": 60.97810745239258,
      "Name": "Town"
    },
    {
      "Confidence": 59.22069549560547,
      "Name": "Sedan"
    },
    {
      "Confidence": 56.48063278198242,
      "Name": "Street"
    },
    {
      "Confidence": 54.23548889160156,
      "Name": "Housing"
    },
    {
      "Confidence": 53.85225296020508,
      "Name": "Metropolis"
    },
    {
      "Confidence": 52.00179672241211,
      "Name": "Office Building"
    },
    {
      "Confidence": 51.3253288269043,
      "Name": "Suv"
    },
    {
      "Confidence": 51.26075744628906,
      "Name": "Apartment Building"
    },
    {
      "Confidence": 51.26075744628906,
      "Name": "High Rise"
    },
    {
      "Confidence": 50.68067932128906,
      "Name": "Pedestrian"
    },
    {
      "Confidence": 50.59546661376953,
      "Name": "Freeway"
    },
    {
      "Confidence": 50.56858825683594,
      "Name": "Bumper"
    }
  ]
}
`);

describe('rekognotify', () => {
  describe('labelsMatch()', () => {
    it('should return false if there is no match', () => {
      match = labelsMatch(labels, ['foo', 'bar', 'baz']);
      assert.equal(false, match);
    });

    it('should return true if there is a match', () => {
      match = labelsMatch(labels, ['Bumper']);
      assert.equal(true, match);
    });

    it('should return true if there is more than one match', () => {
      match = labelsMatch(labels, ['Foo', 'Bumper', 'Freeway']);
      assert.equal(true, match);
    });
  });
});
