window.basepath = process.env.PUBLIC_URL;


export default (window.location.hostname === 'localhost' || /^192.168(?:(?:^|\.)(?:2(?:5[0-5]|[0-4]\d)|1?\d?\d)){2}$/.test(window.location.hostname)) ? 'dev' : 'prod';