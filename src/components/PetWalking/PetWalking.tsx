//React Imports
import { FC, useState, useEffect } from 'react';

//Native Imports
//Styles
import styles from './PetWalking.module.scss';
//Types
import { Pet } from '../../requests/models';

type PetWalkingProps = {
  pet: Pet;
  spriteRight: string;
  spriteLeft: string;
}

export const PetWalking: FC<PetWalkingProps> = ({ pet, spriteRight, spriteLeft }) => {
  const [backgroundImageStyles, setBackgroundImageStyles] = useState({});
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState('right');


  useEffect(() => {
    const moveAnimal = () => {
      let { x, y } = position;


      if (direction === 'right') {
        x += 5;
        if (x + 50 > 400) {
          setDirection('left');
        }
      } else {
        x -= 5;
        if (x < 0) {
          setDirection('right');
        }
      }

      setPosition({ x, y });
    };

    const interval = setInterval(moveAnimal, 100);
    return () => clearInterval(interval);
  }, [position, direction]);

  useEffect(() => {
    const colorFrameMapping = (pet: Pet) => {
      let frames: string[] = [];
      if (pet.color === "Coloration 1") {
        if (pet.breed === "Dog") {
          if (direction === "left") {
            frames = ['012', '013', '014'];
          } else if (direction === "right") {
            frames = ['024', '025', '026'];
          } else {
            frames = ['000', '001', '002'];
          }
        } else {
          if (direction === "left") {
            frames = ['060', '061', '062'];
          } else if (direction === "right") {
            frames = ['072', '073', '074'];
          } else {
            frames = ['048', '049', '050'];
          }
        }
      }
      else if (pet.color === "Coloration 2") {
        if (pet.breed === "Dog") {
          if (direction === "left") {
            frames = ['015', '016', '017'];
          } else if (direction === "right") {
            frames = ['027', '028', '029'];
          } else {
            frames = ['003', '004', '005'];
          }
        } else {
          if (direction === "left") {
            frames = ['063', '064', '065'];
          } else if (direction === "right") {
            frames = ['075', '076', '077'];
          } else {
            frames = ['051', '052', '053'];
          }
        }
      } else {
        if (pet.breed === "Dog") {
          if (direction === "left") {
            frames = ['018', '019', '020'];
          } else if (direction === "right") {
            frames = ['030', '031', '032'];
          } else {
            frames = ['006', '007', '008'];
          }
        } else {
          if (direction === "left") {
            frames = ['066', '067', '068'];
          } else if (direction === "right") {
            frames = ['078', '079', '080'];
          } else {
            frames = ['054', '055', '056'];
          }
        }
      }

      let yPos;

      if (pet.breed === "Dog") {
        if (direction === "right") {
          yPos = '0px'
        } else {
          yPos = '5px'
        }
      } else {
        if (direction === "right") {
          yPos = '-20px'
        } else {
          yPos = '-15px'
        }
      }

      setBackgroundImageStyles({
        '--tile0': `url(/assets/tile${frames[0]}.png)`,
        '--tile1': `url(/assets/tile${frames[1]}.png)`,
        '--tile2': `url(/assets/tile${frames[2]}.png)`,
        '--yPos': yPos
      } as React.CSSProperties);
    };

    colorFrameMapping(pet);
  }, [direction, pet]);

  return (
    <div
      className={styles.animal}
      style={{
        left: position.x,
        backgroundPosition: direction === 'right' ? spriteRight : spriteLeft
      }}>
      <div className={styles.spriteAnimation} style={backgroundImageStyles} />
    </div>
  );
};

