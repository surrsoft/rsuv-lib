import { RsuvTxEmail } from './RsuvTxEmail';
import { testData } from './RsuvTu';
import _ from 'lodash';

describe('RsuvTxEmail', () => {
  // --- false для всех
  const testData0 = _.clone(testData);
  testData0.forEach((el) => {
    el.res = false;
  })
  testData0.push({id: 1001, val: 'mail@mail.ru', desc: 'mail@mail.ru', res: true});
  testData0.push({id: 1003, val: 'mail_1@mail.ru', desc: 'mail_1@mail.ru', res: true});
  testData0.push({id: 1004, val: '1mail@mail.ru', desc: '1mail@mail.ru', res: true});
  testData0.push({id: 1005, val: 'm@mail.ru', desc: 'm@mail.ru', res: true});
  testData0.push({id: 1006, val: '111@mail.ru', desc: '111@mail.ru', res: true});
  testData0.push({id: 1007, val: 'mail@mail.ruru', desc: 'mail@mail.ruru', res: true});
  testData0.push({
    id: 1008,
    val: 'ma!#$%&\'*+-/=?^_`{|}~il@mail.ruru',
    desc: 'ma!#$%&\'*+-/=?^_`{|}~il@mail.ruru',
    res: true
  });
  testData0.push({id: 1009, val: 'ma.il@mail.ruru', desc: 'ma.il@mail.ruru - точка в 1-части', res: true});
  testData0.push({id: 1010, val: 'ma..il@mail.ruru', desc: 'ma..il@mail.ruru - две точки подряд', res: false});
  testData0.push({id: 1011, val: '.mail@mail.ruru', desc: '.mail@mail.ruru - начинается с точки', res: false});
  testData0.push({id: 1012, val: 'mail@mail.r', desc: 'mail@mail.r - один символ в расширении', res: false});
  // --- https://en.wikipedia.org/wiki/Email_address
  const plus = [{id: 2000, val: 'simple@example.com', desc: '', res: true},
    {id: 2001, val: 'very.common@example.com', desc: 'very.common@example.com', res: true},
    {id: 2002, val: 'disposable.style.email.with+symbol@example.com', desc: 'disposable.style.email.with+symbol@example.com', res: true},
    {id: 2003, val: 'other.email-with-hyphen@example.com', desc: 'other.email-with-hyphen@example.com', res: true},
    {id: 2004, val: 'fully-qualified-domain@example.com', desc: 'fully-qualified-domain@example.com', res: true},
    {
      id: 2005,
      val: 'user.name+tag+sorting@example.com',
      desc: 'may go to user.name@example.com inbox depending on mail server',
      res: true
    },
    {id: 2006, val: 'x@example.com', desc: 'one-letter local-part', res: true},
    {id: 2007, val: 'example-indeed@strange-example.com', desc: 'example-indeed@strange-example.com', res: true},
    {id: 2008, val: 'test/test@test.com', desc: 'slashes are a printable character, and allowed', res: true},
    // {
    //   id: 2009,
    //   val: 'admin@mailserver1',
    //   desc: 'local domain name with no TLD, although ICANN highly discourages dotless email addresses[10]',
    //   res: true
    // },
    {id: 2010, val: 'example@s.example', desc: 'see the List of Internet top-level domains', res: true},
    // {id: 2011, val: '" "@example.org', desc: 'space between the quotes', res: true},
    // {id: 2012, val: '"john..doe"@example.org', desc: 'quoted double dot', res: true},
    {id: 2013, val: 'mailhost!username@example.org', desc: 'bangified host route used for uucp mailers', res: true},
    {
      id: 2014,
      val: 'user%example.com@example.org',
      desc: '% escaped mail route to user@example.com via example.org',
      res: true
    },
    {
      id: 2015,
      val: 'user-@example.org',
      desc: 'local part ending with non-alphanumeric character from the list of allowed printable characters',
      res: true
    },

    {id: 2016, val: 'Abc.example.com', desc: 'no @ character', res: false},
    {id: 2017, val: 'A@b@c@example.com', desc: 'only one @ is allowed outside quotation marks', res: false},
    // {
    //   id: 2018,
    //   val: 'a"b(c)d,e:f;g<h>i[j\k]l@example.com',
    //   desc: 'none of the special characters in this local-part are allowed outside quotation marks',
    //   res: false
    // },
    // {
    //   id: 2019,
    //   val: 'just"not"right@example.com',
    //   desc: 'quoted strings must be dot separated or the only element making up the local-part',
    //   res: false
    // },
    {
      id: 2020,
      val: 'this is"not\allowed@example.com',
      desc: 'spaces, quotes, and backslashes may only exist when within quoted strings and preceded by a backslash',
      res: false
    },
    {
      id: 2021,
      val: 'this\ still\"not\\allowed@example.com',
      desc: 'even if escaped preceded by a backslash), spaces, quotes, and backslashes must still be contained by quotes',
      res: false
    },
    {
      id: 2022,
      val: '1234567890123456789012345678901234567890123456789012345678901234+x@example.com',
      desc: 'local-part is longer than 64 characters',
      res: false
    },
    {
      id: 2023,
      val: 'i_like_underscore@but_its_not_allowed_in_this_part.example.com',
      desc: 'Underscore is not allowed in domain part',
      res: false
    },
  ];
  // ---
  [...testData0, ...plus].forEach(el => {
    it(el.desc, () => {
      if (!el.res) {
        expect(() => {
          new RsuvTxEmail(el.val as any);
        }).toThrow()
      } else {
        const rts = new RsuvTxEmail(el.val as any)
        const valid = rts.bnuwIsValid()
        expect(valid.success).toEqual(el.res);
      }
    })
  })
});
